import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import {
    getAutoCompleteSuggestion,
    getCoordinates,
    getDistanceMatrix,
} from '../controller/map.controller.js';

const router = express.Router();

router.get('/get-coordinates', authMiddleware, getCoordinates);
router.get('/get-distance-matrix', authMiddleware, getDistanceMatrix);
router.get('/get-suggestion', authMiddleware, getAutoCompleteSuggestion);

export default router;
