import Database from 'better-sqlite3';
import type { Campaign, Vote, User, AuditLog } from '../types';

const db = new Database('thusvote.db');

// Initialize database tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL CHECK(role IN ('admin', 'user'))
  );

  CREATE TABLE IF NOT EXISTS campaigns (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    startDate TEXT NOT NULL,
    endDate TEXT NOT NULL,
    choices TEXT NOT NULL,
    isPaid INTEGER NOT NULL,
    price REAL,
    createdBy TEXT NOT NULL,
    FOREIGN KEY(createdBy) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS votes (
    id TEXT PRIMARY KEY,
    campaignId TEXT NOT NULL,
    userId TEXT NOT NULL,
    choice TEXT NOT NULL,
    timestamp TEXT NOT NULL,
    signature TEXT NOT NULL,
    FOREIGN KEY(campaignId) REFERENCES campaigns(id),
    FOREIGN KEY(userId) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS audit_logs (
    id TEXT PRIMARY KEY,
    userId TEXT NOT NULL,
    action TEXT NOT NULL,
    details TEXT,
    timestamp TEXT NOT NULL,
    FOREIGN KEY(userId) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS rate_limits (
    userId TEXT NOT NULL,
    action TEXT NOT NULL,
    count INTEGER NOT NULL,
    timestamp TEXT NOT NULL,
    PRIMARY KEY(userId, action),
    FOREIGN KEY(userId) REFERENCES users(id)
  );
`);

// Rate limiting
const RATE_LIMIT_WINDOW = 3600000; // 1 hour in milliseconds
const MAX_VOTES_PER_HOUR = 10;

const checkRateLimit = (userId: string, action: string): boolean => {
  const stmt = db.prepare(`
    SELECT count, timestamp
    FROM rate_limits
    WHERE userId = ? AND action = ?
  `);
  
  const limit = stmt.get(userId, action);
  
  if (!limit) {
    db.prepare(`
      INSERT INTO rate_limits (userId, action, count, timestamp)
      VALUES (?, ?, 1, ?)
    `).run(userId, action, new Date().toISOString());
    return true;
  }

  const timeDiff = Date.now() - new Date(limit.timestamp).getTime();
  
  if (timeDiff > RATE_LIMIT_WINDOW) {
    db.prepare(`
      UPDATE rate_limits
      SET count = 1, timestamp = ?
      WHERE userId = ? AND action = ?
    `).run(new Date().toISOString(), userId, action);
    return true;
  }

  if (limit.count >= MAX_VOTES_PER_HOUR) {
    return false;
  }

  db.prepare(`
    UPDATE rate_limits
    SET count = count + 1
    WHERE userId = ? AND action = ?
  `).run(userId, action);
  
  return true;
};

// Existing functions with added security measures
export const createCampaign = (campaign: Campaign) => {
  const stmt = db.prepare(`
    INSERT INTO campaigns (id, title, description, startDate, endDate, choices, isPaid, price, createdBy)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  
  return stmt.run(
    campaign.id,
    campaign.title,
    campaign.description,
    campaign.startDate.toISOString(),
    campaign.endDate.toISOString(),
    JSON.stringify(campaign.choices),
    campaign.isPaid ? 1 : 0,
    campaign.price,
    campaign.createdBy
  );
};

export const recordVote = async (vote: Vote, userId: string) => {
  if (!checkRateLimit(userId, 'vote')) {
    throw new Error('Rate limit exceeded');
  }

  const signature = await generateVoteSignature(vote);
  
  const stmt = db.prepare(`
    INSERT INTO votes (id, campaignId, userId, choice, timestamp, signature)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  
  return stmt.run(
    vote.id,
    vote.campaignId,
    vote.userId,
    vote.choice,
    vote.timestamp.toISOString(),
    signature
  );
};

// Helper function to generate vote signature
const generateVoteSignature = async (vote: Vote): Promise<string> => {
  const data = `${vote.id}:${vote.campaignId}:${vote.userId}:${vote.choice}:${vote.timestamp.toISOString()}`;
  const encoder = new TextEncoder();
  const signature = await crypto.subtle.digest('SHA-256', encoder.encode(data));
  return Array.from(new Uint8Array(signature))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
};

export const getVoteResults = (campaignId: string) => {
  const stmt = db.prepare(`
    SELECT 
      choice,
      COUNT(*) as count,
      COUNT(*) * 100.0 / (
        SELECT COUNT(*) 
        FROM votes 
        WHERE campaignId = ?
      ) as percentage
    FROM votes
    WHERE campaignId = ?
    GROUP BY choice
    ORDER BY count DESC
  `);
  
  return stmt.all(campaignId, campaignId);
};