import { Router } from 'express';
import { register, login, getProfile } from '../controllers/userController';
import auth from '../middleware/auth';
import validate from '../middleware/validation';
import Joi from 'joi';

const router = Router();

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.get('/profile', auth, getProfile);

export default router;
