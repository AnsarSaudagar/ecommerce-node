import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

export const authenticateToken = (req: any, res: any, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Access Token Required' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
        req.user = decoded; // Attach userId to req.user
        next();
    } catch (err) {
        res.status(403).json({ message: 'Invalid Token' });
    }
};
