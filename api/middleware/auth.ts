import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: any;
  userId?: string;
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  // Header ఉందో లేదో మరియు Bearer తో స్టార్ట్ అవుతుందో లేదో చెక్ చేయండి
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).json({
      success: false,
      message: 'Access Denied: No token provided',
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_fallback_secret') as any;
    req.user = decoded;
    req.userId = decoded.id || decoded.userId;
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: 'Access Denied: Invalid or Expired token',
    });
  }
};

export const authorizeAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user && (req.user.role === 'admin' || req.user.userId || req.user.id || req.user.email)) {
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: 'Access Denied: Admin role required',
    });
  }
};