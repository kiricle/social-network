import UserDTO from '@/dto/UserDTO';
import UserService from '@/services/UserService';
import { NextFunction, Request, Response } from 'express';

interface IUserRequest extends Request {
    user: {
        id: number;
        iat: number;
        exp: number;
    };
}

class UserController {
    async getUserById(req: IUserRequest, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const requestingUser = req.user;

            const requestedUser = await UserService.getUserById(id);

            const userDto = new UserDTO(requestedUser);

            res.status(200).json({
                userDto,
                isCurrentUser: requestingUser.id === requestedUser.id,
            });
        } catch (error) {
            next(error);
        }
    }
}

export default new UserController();
