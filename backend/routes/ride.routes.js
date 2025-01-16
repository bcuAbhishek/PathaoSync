import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { body } from 'express-validator';
import { confirmRide, createRide, startRide, vehiclePrice } from '../controller/ride.controller.js';
import { getFare } from '../service/ride.service.js';

const router = express.Router();

router.post(
    '/create-ride',
    authMiddleware,
    body('pickup')
        .isString()
        .isLength({ min: 3 })
        .withMessage('Invalid pickup location'),
    body('destination')
        .isString()
        .isLength({ min: 3 })
        .withMessage('Invalid destination location'),
    body('vehicleType')
        .isString()
        .isIn(['car', 'auto', 'motorcycle'])
        .withMessage('Invalid vehicle type'),

    createRide
);

router.post('/get-fare', authMiddleware, vehiclePrice);

router.post('/confirm-ride', authMiddleware, confirmRide)

router.post('/start-ride', authMiddleware, startRide);



export default router;
