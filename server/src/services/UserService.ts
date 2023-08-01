import UserDTO from '@/dto/UserDTO';
import { APIError } from '@/exceptions/APIError';
import prisma from '@/utils/db.server';
import path from 'path';
import fs from 'fs';

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

    async updateProfilePicture(id: number, picture: Express.Multer.File) {
        const { profile_picture } = await prisma.user.findFirst({
            where: {
                id,
            },
        });

        await this.deleteProfilePicture(profile_picture);

        const user = await prisma.user.update({
            where: {
                id,
            },
            data: {
                profile_picture: path.join(`${picture.destination.slice(1)}/${picture.filename}`),
            },
        });

        const userDTO = new UserDTO(user);

        return {
            message: 'Successfully updated',
            userDTO,
        };
    }

    async deleteProfilePicture(picturePath: string) {
        if (picturePath == '/profile/default.png') return;
        const fullPath = path.join(__dirname, '../..', picturePath)
        fs.unlink(fullPath, (err) => {
            if (err) {
                return err;
            }
        });
    }
}

export const userService = new UserService();
