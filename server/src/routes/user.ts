import { Router } from 'express';
import userController from '@/controllers/UserController';
import { body } from 'express-validator';
import { validate } from '@/middleware/validateMiddleware';

const userRouter = Router();

userRouter.post('/register', validate('registerUser'), userController.register);

userRouter.post('/login', validate('loginUser'), userController.login);

export default userRouter;
