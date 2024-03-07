import express from 'express';
import { validateUser, validateEmail, validatePassword } from '../validations/formValidations.js';
import { createUser, login, updateUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/register', validateUser(), validateEmail(), validatePassword(), createUser);
router.post('/login', login);
router.put('/update/:id', updateUser);

export default router;