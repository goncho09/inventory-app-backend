import { Router } from 'express';
import { logIn, signUp } from '../controllers/authController.js';

const router = Router();

router.post('/login', logIn);
router.post('/signup', signUp);

export default router;
