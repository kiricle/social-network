import { APIError } from '@/exceptions/APIError';
import { UserJwtPayload } from '@/interfaces/UserJwtPayload';
import { addStringDateToNow } from '@/utils/addStringDateToNow';
import prisma from '@/utils/db.server';
import env from 'dotenv';
import jwt from 'jsonwebtoken';

env.config();

interface TokenPayload {
    id: number;
}

class TokenService {
    private accessSecret: string = process.env.JWT_ACCESS_SECRET;
    private refreshSecret: string = process.env.JWT_REFRESH_SECRET;
    private accessTokenExpiresIn: string =
        process.env.JWT_ACCESS_TOKEN_EXPIRES_IN;
    private refreshTokenExpiresIn: string =
        process.env.JWT_REFRESH_TOKEN_EXPIRES_IN;

    generateToken(payload: TokenPayload) {
        const accessToken = jwt.sign(payload, this.accessSecret, {
            expiresIn: this.accessTokenExpiresIn,
        });

        const refreshToken = jwt.sign(payload, this.refreshSecret, {
            expiresIn: this.refreshTokenExpiresIn,
        });

        return {
            accessToken,
            refreshToken,
        };
    }

    async saveToken(userId: number, refreshToken: string) {
        const tokenData = await prisma.token.findFirst({
            where: {
                userId,
            },
        });

        const expiresAt = addStringDateToNow(this.refreshTokenExpiresIn);

        if (tokenData !== null) {
            return await prisma.token.update({
                where: {
                    id: tokenData.id,
                },
                data: {
                    expiresAt: expiresAt,
                    token: refreshToken,
                },
            });
        }

        return await prisma.token.create({
            data: {
                userId,
                expiresAt: expiresAt,
                token: refreshToken,
            },
        });
    }

    async removeToken(refreshToken: string) {
        return await prisma.token.delete({
            where: {
                token: refreshToken,
            },
        });
    }

    validateAccessToken(token: string) {
        try {
            const userData = jwt.verify(token, this.accessSecret);

            return userData;
        } catch (error) {
            return null;
        }
    }

    validateRefreshToken(token: string) {
        try {
            const userData = jwt.verify(
                token,
                this.refreshSecret
            ) as UserJwtPayload;

            return userData;
        } catch (error) {
            return null;
        }
    }

    async findToken(refreshToken: string) {
        const tokenFromDB = await prisma.token.findFirst({
            where: {
                token: refreshToken,
            },
        });

        return tokenFromDB;
    }
}

export const tokenService = new TokenService();
