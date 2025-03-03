import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key-for-dev';

export interface AuthPayload {
  userId: string;
  token: string;
}

export async function verifyAuth(request: Request): Promise<AuthPayload> {
  try {
    // Get the token from the authorization header
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.startsWith('Bearer ') 
      ? authHeader.substring(7) 
      : null;

    // If no token is provided, check cookies or local storage
    // This is a simplified approach - in a real app, you might use cookies with httpOnly
    if (!token) {
      return { userId: '', token: '' };
    }

    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string, email: string };
    
    return {
      userId: decoded.userId,
      token
    };
  } catch (error) {
    console.error('Auth verification error:', error);
    return { userId: '', token: '' };
  }
} 