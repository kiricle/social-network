import { convertStringToDate } from '@/utils/convertStringToDate';
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

        const expiresAt = convertStringToDate(this.refreshTokenExpiresIn)

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
}

export const tokenService = new TokenService();
