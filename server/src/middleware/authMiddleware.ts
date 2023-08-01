import { NextFunction, Request, Response } from 'express';
import { APIError } from '@/exceptions/APIError';
import { tokenService } from '@/services/TokenService';

export function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return next(APIError.unAuthorized([]));
        }

        const accessToken = authHeader.split(' ')[1];

        if (!accessToken) {
            return next(APIError.unAuthorized([]));
        }

        const userData = tokenService.validateAccessToken(accessToken);

        if (!userData) {
            return next(APIError.unAuthorized([]));
        }

        req['user'] = userData;

        next();
    } catch (error) {
        next(APIError.unAuthorized([]));
    }
}
