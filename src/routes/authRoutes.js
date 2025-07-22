import { Router } from 'express';
import {
  logIn,
  signUp,
  getInfo,
  logOut,
} from '../controllers/authController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/login', logIn);
router.post('/signup', signUp);
router.get('/me', authMiddleware, getInfo);
router.post('/logout', authMiddleware, logOut);

export default router;
