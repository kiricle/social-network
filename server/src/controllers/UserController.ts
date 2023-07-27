import UserDTO from '@/dto/UserDTO';
import { tokenService } from '@/services/TokenService';
import UserService from '@/services/UserService';
import { NextFunction, Request, Response } from 'express';

class userController {
    async getUserById(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.cookies;
            const { id } = req.params;

            const user = await UserService.getUserById(id);
            const responser = await tokenService.validateRefreshToken(
                refreshToken
            );

            const userDto = new UserDTO(user);

            res.status(200).json({
                userDto,
                isCurrentUser: responser.id === user.id,
            });
        } catch (error) {
            next(error);
        }
    }
}

export default new userController();
