import AuthController from '@/controllers/AuthController';
import { validate } from '@/middleware/validateMiddleware';
import { Router } from 'express';

const authRouter = Router();

authRouter.post('/register', validate('registerUser'), AuthController.register);

authRouter.post('/login', validate('loginUser'), AuthController.login);

authRouter.post('/logout', AuthController.logout);

authRouter.post('/refresh', AuthController.refresh);

export default authRouter;
