import { Response } from "express";
import { PrismaClient } from "@prisma/client";
import { AuthRequest } from "../middlewares/authMiddleware";

const prisma = new PrismaClient();  

export const getTasks = async (req: AuthRequest, res: Response) => {
  const userId = req.userId!;

  const tasks = await prisma.task.findMany({where:{userId}});
  res.json(tasks);
}

export const createTask = async (req: AuthRequest, res: Response) => {
  const userId = req.userId!;
  const { title, description } = req.body;

  if (!title) return res.status(400).json({error:"Título é obrigatório."});

  const task = await prisma.task.create({data:{title, description, userId}});

  res.status(201).json(task);
}

export const updateTask = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const {title, description, status} = req.body;

  try{  
    const task = await prisma.task.update({
      where:{id: Number(id)},
      data:{title, description, status}
    })
    res.json(task);
  }catch{
    res.status(404).json({error:"Tarefa não encontrada."});
  }
}

export const deleteTask = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  try{  
    await prisma.task.delete({ where: {id: Number(id)} });
    res.json({message:"Tarefa deletada com sucesso."});
  }catch{
    res.status(404).json({error:"Tarefa não encontrada."});
  }
}

