import { body } from 'express-validator';

interface Method {
    method: 'registerUser' | 'loginUser';
}

export function validate(method) {
    switch (method) {
        case 'registerUser':
            return [
                body('email').trim().isEmail(),
                body('password')
                    .notEmpty()
                    .isStrongPassword({
                        minNumbers: 1,
                        minSymbols: 1,
                        minUppercase: 1,
                        minLength: 8,
                    })
                    .withMessage(
                        'Password must be at least 8 characters long and contain at least 1 number, 1 symbol, and 1 uppercase letter.'
                    ),
                body('firstName').trim().notEmpty(),
                body('lastName').trim().notEmpty(),
            ];
        case 'loginUser':
            return [
                body('email').trim().isEmail(),
                body('password').notEmpty().withMessage('Password is required.'),
            ];
        default:
            break;
    }
}
