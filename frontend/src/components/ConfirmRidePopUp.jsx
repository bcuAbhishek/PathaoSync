import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { MapPin, DollarSign, KeyRound, X } from 'lucide-react';

const ConfirmRidePopUp = ({
    setConfirmRideOfPassenger,
    setRideOn,
    rideData,
}) => {
    const {
        user = {},
        pickup = '',
        destination = '',
        fare = 0,
    } = rideData || {};
    const fullName = `${user.fullName?.firstName || ''} ${
        user.fullName?.lastName || ''
    }`;

    const [otp, setOtp] = useState('');

    const { mutate: startRide } = useMutation({
        mutationFn: async () => {
            const response = await axios.post('/api/ride/start-ride', {
                rideId: rideData._id,
                otp,
            });
            return response.data;
        },
        onSuccess: async (data) => {
            console.log(data);
            setRideOn(true);
        },
        onError: (error) => {
            toast.error('Failed to start ride');
            console.log(error);
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        startRide();
    };

    return (
        <div className=" flex items-center justify-center ">
            <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative">
                {/* Close Button */}
                <button
                    onClick={() => setConfirmRideOfPassenger(false)}
                    className="absolute right-4 top-4 p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <X className="w-5 h-5 text-gray-500" />
                </button>

                {/* Header */}
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Confirm Ride</h3>

                {/* Passenger Info */}
                <div className="flex items-center mb-6">
                    <div className="relative">
                        <img
                            src={
                                user.profilePicture ||
                                'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop'
                            }
                            alt={fullName}
                            className="w-16 h-16 rounded-full object-cover border-2 border-green-500"
                        />
                        <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div className="ml-4">
                        <h4 className="text-lg font-semibold text-gray-800">{fullName}</h4>
                        <p className="text-gray-500">Passenger</p>
                    </div>
                </div>

                {/* Ride Details */}
                <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                        <MapPin className="w-5 h-5 text-green-600" />
                        <div>
                            <p className="text-sm text-gray-500">Pickup Location</p>
                            <p className="font-medium text-gray-800">{pickup}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                        <MapPin className="w-5 h-5 text-red-600" />
                        <div>
                            <p className="text-sm text-gray-500">Destination</p>
                            <p className="font-medium text-gray-800">{destination}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                        <DollarSign className="w-5 h-5 text-green-600" />
                        <div>
                            <p className="text-sm text-gray-500">Fare Amount</p>
                            <p className="font-medium text-gray-800">${fare.toFixed(2)}</p>
                        </div>
                    </div>
                </div>

                {/* OTP Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Enter OTP to Start Ride
                        </label>
                        <div className="relative">
                            <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder="Enter 4-digit OTP"
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button
                            type="submit"
                            className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                        >
                            Confirm Ride
                        </button>
                        <button
                            type="button"
                            onClick={() => setConfirmRideOfPassenger(false)}
                            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ConfirmRidePopUp;