import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const SECRET = process.env.SECRET || "";

export interface AuthRequest extends Request {
  userId?: number;
}


export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({error: "Token ausente ou inválido."});

  const [, token] = authHeader.split(" ");
  try{
    const decoded = jwt.verify(token, SECRET) as { id:number }; 
    (req as any).userId = decoded.id;
    next();
  } catch{
    res.status(401).json({error: "Token inválido."});
  }
};