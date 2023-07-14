import { APIError } from '@/exceptions/APIError';
import userService from '@/services/UserService';
import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

class userController {
    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return next(
                    APIError.badRequest('Validation error', errors.array())
                );
            }

            const { firstName, lastName, password, email } = req.body;

            const user = await userService.register(
                email,
                password,
                firstName,
                lastName
            );

            res.status(201).json(user);
        } catch (error) {
            next(error);
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return next(
                    APIError.badRequest('Validation error', errors.array())
                );
            }

            const { email, password } = req.body;

            const userData = await userService.login(email, password);

            res.status(200).json(userData);
        } catch (error) {
            next(error);
        }
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.cookies;
            await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            res.status(200).json({ message: 'User logged out' });
        } catch (error) {
            next(error);
        }
    }
}

export default new userController();
