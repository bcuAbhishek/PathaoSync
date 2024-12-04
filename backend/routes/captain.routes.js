import express from 'express';
import { createCaptain } from '../controller/captain.controller.js';
const router = express.Router();

router.post('/register', createCaptain)

export default router;