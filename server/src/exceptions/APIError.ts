import { ValidationError } from 'express-validator';

export class APIError extends Error {
    constructor(
        public readonly message: string,
        public readonly status: number,
        public readonly errors: ValidationError[]
    ) {
        super(message);
    }

    static badRequest(message: string, errors: ValidationError[]) {
        return new APIError(message, 400, errors);
    }

    static unAuthorized(errors) {
        return new APIError('Unauthorized', 401, errors);
    }

    static validationError(message: string) {
        return new APIError(message, 422, []);
    }
}
