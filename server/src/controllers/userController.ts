import userService from '@/services/UserService';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

class userController {
    async register(req: Request, res: Response) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
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
            console.log(error);
        }
    }

    async login(req: Request, res: Response) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { email, password } = req.body;

            const userData = await userService.login(email, password);

            res.status(200).json(userData);
        } catch (error) {
            console.log(error);
        }
    }
}

export default new userController();
