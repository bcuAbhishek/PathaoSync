import express from 'express';
import { createUser, getMe, loginUser, logoutUser } from '../controller/user.controller.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/me', authMiddleware, getMe);
router.post('/logout', authMiddleware, logoutUser)

export default router;
