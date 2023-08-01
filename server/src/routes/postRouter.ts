import { postController } from '@/controllers/PostController';
import { authMiddleware } from '@/middleware/authMiddleware';
import { Router } from 'express';

const postRouter = Router();

postRouter.post('/create', authMiddleware, postController.createPost)

export default postRouter;