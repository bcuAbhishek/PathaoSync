import Captain from '../models/captain.model.js';
import RideModel from '../models/ride.model.js';
import { getAddressCoordinate } from '../service/maps.service.js';
import {
    createRideService,
    getFare,
    getRideByRadiusService,
} from '../service/ride.service.js';
import { sendMessageToSocketId } from '../socket.js';

export const createRide = async (req, res) => {
    const userId = req.user._id;

    const { pickup, destination, vehicleType } = req.body;

    try {
        const ride = await createRideService({
            userId,
            pickup,
            destination,
            vehicleType,
        });

        const userLocation = await getAddressCoordinate(pickup);

        console.log(userLocation);

        const captainsInRadius = await getRideByRadiusService(
            userLocation.lat,
            userLocation.lng,
            10
        );

        console.log(captainsInRadius);

        ride.otp = '';

        const rideWithUser = await RideModel.findById(ride._id).populate(
            'user'
        );

        captainsInRadius.map((captain) => {
            sendMessageToSocketId(captain.socketId, {
                event: 'new-ride',
                data: rideWithUser,
            });
        });

        return res.status(200).json(ride);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const vehiclePrice = async (req, res) => {
    const { pickup, destination } = req.body;

    try {
        const fare = await getFare(pickup, destination);
        return res.status(200).json(fare);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

export const confirmRide = async (req, res) => {
    const { rideId, captainId } = req.body;

    try {
        const ride = await RideModel.findById(rideId).populate('user');
        ride.captain = captainId;
        ride.status = 'accepted';
        await ride.save();

        const captain = await Captain.findById(captainId);

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-accepted',
            data: { captain, ride },
        });

        return res.status(200).json(ride);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

export const startRide = async (req, res) => {
    const { rideId, otp } = req.body;

    try {
        const ride = await RideModel.findById(rideId).populate('user');

        if (ride.otp !== otp) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        ride.status = 'ongoing';
        await ride.save();

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-started',
            data: { ride },
        });

        return res.status(200).json(ride);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};
