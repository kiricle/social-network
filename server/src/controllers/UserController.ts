import { userService } from '@/services/UserService';
import UserDTO from '@/dto/UserDTO';
import { APIError } from '@/exceptions/APIError';
import { NextFunction, Request, Response } from 'express';
import { IUserRequest } from '@/interfaces/IUserRequest';



class UserController {
    async getUserById(req: IUserRequest, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const requestingUser = req.user;

            const requestedUser = await userService.getUserById(id);

            const userDto = new UserDTO(requestedUser);

            res.status(200).json({
                userDto,
                isCurrentUser: requestingUser.id === requestedUser.id,
            });
        } catch (error) {
            next(error);
        }
    }

    async updateProfilePicture(
        req: IUserRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { file } = req;

            if (!file) {
                next(APIError.badRequest('File has not been uploaded', []));
            }

            const { id } = req.params;
            const requestingUser = req.user;

            if (Number.parseInt(id) !== requestingUser.id) {
                return next(
                    APIError.forbidden(
                        "You don't have rights to edit this profile"
                    )
                );
            }

            const result = await userService.updateProfilePicture(
                Number.parseInt(id),
                file
            );

            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
}

export default new UserController();
