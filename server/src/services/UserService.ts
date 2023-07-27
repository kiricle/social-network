import { APIError } from '@/exceptions/APIError';
import prisma from '@/utils/db.server';

class UserService {
    async getUserById(id) {
        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(id),
            },
        });

        if (!user) {
            throw APIError.notFound('User not found');
        }

        return user;
    }
}

export default new UserService();
