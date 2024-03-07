import { body } from 'express-validator';

const validateUser = () => body('username').trim().isLength({ min: 3 }).withMessage('username must be atleast 3 characters');
const validateEmail = () => body('email').isEmail().withMessage('Please enter valid email address');
const validatePassword = () => body('password').trim().custom(async(value) => {
    const passwordRegex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$";
    if(!await RegExp(passwordRegex).test(value)) {
        throw new Error('Password should be min 8 chars with atleast 1 special, 1 digit and 1 uppercase');
    }
    return true;
})

export {
    validateUser,
    validateEmail,
    validatePassword
}