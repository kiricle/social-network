import userService from '@/services/userService';

class userController {
    async register(req, res) {
        try {
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
}

export default new userController();
