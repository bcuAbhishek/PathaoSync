import express from 'express';
import {
    createCaptain,
    getMeCaptain,
    loginCaptain,
    logoutCaptain,
} from '../controller/captain.controller.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post('/register', createCaptain);
router.post('/login', loginCaptain);
router.get('/getCaptain', authMiddleware, getMeCaptain);
router.post('/logout', authMiddleware, logoutCaptain);

export default router;
