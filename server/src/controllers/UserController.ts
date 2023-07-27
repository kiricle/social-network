import UserDTO from '@/dto/UserDTO';
import UserService from '@/services/UserService';
import { NextFunction, Request, Response } from 'express';

class userController {
    async getUserById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;

            const user = await UserService.getUserById(id);

            const userDto = new UserDTO(user);

            res.status(200).json(userDto);
        } catch (error) {
            next(error);
        }
    }
}

export default new userController();
