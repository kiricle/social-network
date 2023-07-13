import UserDto from '@/dto/userDto';
import prisma from '@/utils/db.server';
import bcrypt from 'bcrypt';

class UserService {
    async register(email, password, firstName, lastName) {
        const doesUserExist = await prisma.user.findFirst({
            where: {
                email,
            },
        });

        if (doesUserExist) {
            throw new Error('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                firstName,
                lastName,
            },
        });

        const userDto = new UserDto(
            user.id,
            user.email,
            user.firstName,
            user.lastName,
            user.role
        );

        return userDto;
    }
}

export default new UserService();
