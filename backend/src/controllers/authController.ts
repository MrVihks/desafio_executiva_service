import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const SECRET = process.env.SECRET || "";


export const signup = async (req: Request, res: Response) => {
  try{
    const {name, email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({data:{name,email,password:hashed}});
    res.json(user);
    
    } catch(e){
      res.status(400).json({error:"Erro ao cadastrar o usuário."});
    }
};

export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({where:{email}});
  if(!user) return res.status(400).json({error:"Usuário não encontrado."});

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({error:"Senha inválida."});

  const token = jwt.sign({id:user.id, email:user.email}, SECRET , { expiresIn:"1d"});
  res.json({ token });
}