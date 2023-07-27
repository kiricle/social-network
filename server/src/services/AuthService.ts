import { APIError } from '../exceptions/APIError';
import UserDTO from '@/dto/UserDTO';
import { tokenService } from '@/services/TokenService';
import prisma from '@/utils/db.server';
import bcrypt from 'bcrypt';

class AuthService {
    async register(email, password, firstName, lastName) {
        const doesUserExist = await prisma.user.findFirst({
            where: {
                email,
            },
        });

        if (doesUserExist) {
            throw APIError.badRequest('User already exists', []);
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

        const userDto = new UserDTO(user);

        return userDto;
    }

    async login(email, password) {
        const user = await prisma.user.findFirst({
            where: {
                email,
            },
        });

        if (!user) {
            throw APIError.badRequest('User not found', []);
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw APIError.badRequest('Invalid password', []);
        }

        const tokens = tokenService.generateToken({
            id: user.id,
        });

        await tokenService.saveToken(user.id, tokens.refreshToken);

        return {
            user: new UserDTO(user),
            tokens,
        };
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);

        return token;
    }

    async refresh(refreshToken) {
        if(!refreshToken) {
            throw APIError.badRequest('Token not provided', []);
        }

        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
    
        if (!userData || !tokenFromDb) {
            throw APIError.unAuthorized([]);
        }

        const user = await prisma.user.findFirst({
            where: {
                id: userData.id,
            },
        });

        const userDTO = new UserDTO(user);
        const tokens = tokenService.generateToken({
            id: user.id,
        });

        await tokenService.saveToken(user.id, tokens.refreshToken);

        return {
            user: userDTO,
            ...tokens,
        };
    }

    async getProfileData(userId) {
        
    }
}

export default new AuthService();
