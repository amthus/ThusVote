import { db } from '../db';

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  details: string;
  timestamp: Date;
}

export const logAction = (userId: string, action: string, details: string) => {
  const stmt = db.prepare(`
    INSERT INTO audit_logs (id, userId, action, details, timestamp)
    VALUES (?, ?, ?, ?, ?)
  `);

  return stmt.run(
    crypto.randomUUID(),
    userId,
    action,
    details,
    new Date().toISOString()
  );
};