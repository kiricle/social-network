import userController from '@/controllers/UserController';
import { authMiddleware } from '@/middleware/authMiddleware';
import { Router } from 'express';
import { profilePicsUpload } from '@/multer/upload';

const userRouter = Router();

userRouter.get('/:id', authMiddleware, userController.getUserById);

userRouter.patch(
    '/:id/profile/picture/',
    authMiddleware,
    profilePicsUpload.single('picture'),
    userController.updateProfilePicture
);

export default userRouter;
