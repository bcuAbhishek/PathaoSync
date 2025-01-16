import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';

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
        <div className='bg-white p-4 rounded-lg'>
            <h3 className='text-lg font-semibold mb-4'>Confirm Ride</h3>
            <div className='flex items-center mb-4'>
                <img
                    src={
                        user.profilePicture ||
                        'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
                    }
                    alt='pp'
                    className='w-12 h-12 rounded-full mr-4 object-cover'
                />
                <div>
                    <p className='text-sm font-medium'>{fullName}</p>
                    <p className='text-sm text-gray-600'>{pickup}</p>
                </div>
            </div>
            <div className='mb-4'>
                <p className='text-sm font-medium'>
                    Destination: {destination}
                </p>
                <p className='text-sm text-gray-600'>
                    Amount: ${fare.toFixed(2)}
                </p>
            </div>
            <form action='' onSubmit={handleSubmit}>
                <input
                    type='text'
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder='OTP'
                    className='border border-gray-300 rounded px-3 py-2 w-full'
                />
                <div className='flex flex-col gap-2 font-semibold'>
                    <button
                        type='submit'
                        className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'
                    >
                        Confirm
                    </button>
                    <button
                        type='submit'
                        className='bg-slate-200 px-4 py-2 rounded hover:bg-red-600'
                        onClick={() => setConfirmRideOfPassenger(false)}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ConfirmRidePopUp;
