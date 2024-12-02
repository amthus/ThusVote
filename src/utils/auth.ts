import { z } from 'zod';

export const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(['admin', 'user'])
});

export const encryptPassword = async (password: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
};

export const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
  const passwordHash = await encryptPassword(password);
  return passwordHash === hash;
};