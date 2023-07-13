import { Router } from 'express';
import userController from '@/controllers/userController';

const userRouter = Router();

userRouter.post('/register', userController.register);

export default userRouter;
