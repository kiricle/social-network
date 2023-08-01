import PostDTO from '@/dto/PostDTO';
import { IUserRequest } from '@/interfaces/IUserRequest';
import { postService } from '@/services/PostService';
import { NextFunction, Response } from 'express';

class PostController {
    async createPost(req: IUserRequest, res: Response, next: NextFunction) {
        try {
            const { id } = req.user;

            const postDTO = new PostDTO({ ...req.body, authorId: id });

            const post = await postService.createPost(postDTO);
            
            res.status(200).json(post);
        } catch (error) {
            next(error);
        }
    }
}

export const postController = new PostController();
