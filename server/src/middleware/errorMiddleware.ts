import { APIError } from '@/exceptions/APIError';
import { NextFunction, Response, Request } from 'express';

export function errorMiddleware(
    err: APIError | Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (err instanceof APIError) {
        return res
            .status(err.status)
            .json({ message: err.message, errors: err.errors });
    }

    return res.status(500).json({ message: 'Unexpected Error', error: err });
}
