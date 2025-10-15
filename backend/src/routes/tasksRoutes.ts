import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { createTask, deleteTask, getTasks, updateTask } from "../controllers/taskController";

const router = Router();

router.use(authMiddleware);
router.get("/",getTasks);
router.post("/",createTask);
router.put("/:id",updateTask);
router.delete("/:id",deleteTask); 


export default router;