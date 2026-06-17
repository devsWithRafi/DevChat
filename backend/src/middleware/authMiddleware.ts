import { getAuth } from '@clerk/express';
import type { NextFunction, Request, Response } from 'express';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { isAuthenticated, userId } = getAuth(req);
    if (!isAuthenticated) {
      return res.status(401).json({ error: 'User not authenticated' });
    }
    req.userId = userId;
    next();
  } catch (error) {
    console.error('Auth error:', error);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};
