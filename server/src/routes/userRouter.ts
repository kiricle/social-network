import userController from "@/controllers/UserController";
import { authMiddleware } from "@/middleware/authMiddleware";
import { Router } from "express";

const userRouter = Router();

userRouter.get('/:id', authMiddleware, userController.getUserById);

export default userRouter;