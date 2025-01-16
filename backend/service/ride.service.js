import Captain from '../models/captain.model.js';
import rideModel from '../models/ride.model.js';
import { getDistanceMatrixService } from './maps.service.js';
import crypto from 'crypto';

export const getFare = async (pickup, destination) => {
    if (!pickup || !destination) {
        throw new Error('Pickup and destination are required');
    }

    const distance = await getDistanceMatrixService(pickup, destination);

    const baseFare = 50; // Base fare in Nepalese Rupee
    const perKmRate = {
        car: 50,
        auto: 20,
        motorcycle: 15,
    };

    const fare = {
        car: (
            baseFare +
            (distance.duration.value / 100) * perKmRate.car
        ).toFixed(2),
        auto: (
            baseFare +
            (distance.duration.value / 100) * perKmRate.auto
        ).toFixed(2),
        motorcycle: (
            baseFare +
            (distance.duration.value / 100) * perKmRate.motorcycle
        ).toFixed(2),
    };
    return fare;
};

function getOtp(length) {
    if (!Number.isInteger(length) || length <= 0) {
        throw new Error('OTP length must be a positive integer');
    }

    const buffer = crypto.randomBytes(length);
    const otp = Array.from(buffer)
        .map((byte) => byte % 10)
        .join('');

    return otp.substring(0, length);
}

export const createRideService = async ({
    userId,
    pickup,
    destination,
    vehicleType,
}) => {
    if (!userId || !pickup || !destination || !vehicleType) {
        console.log(userId, pickup, destination, vehicleType);
        throw new Error('Missing required fields');
    }

    const fare = await getFare(pickup, destination);

    const ride = new rideModel({
        user: userId,
        pickup,
        destination,
        otp: getOtp(6),
        fare: fare[vehicleType],
    });

    await ride.save();
    return ride;
};

export const getRideByRadiusService = async (
    latitude,
    longitude,
    radius = 1
) => {
    if (!latitude || !longitude) {
        throw new Error('Latitude and longitude are required');
    }

    const rides = await Captain.find({
        location: {
            $geoWithin: {
                $centerSphere: [[longitude, latitude], radius / 6378.1],
            },
        },
    });

    return rides;
};
