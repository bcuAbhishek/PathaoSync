const FinishRide = ({ rideData }) => {
    const {
        user = {},
        pickup = '',
        destination = '',
        fare = 0,
    } = rideData || {};
    const fullName = `${user.fullName?.firstName || ''} ${
        user.fullName?.lastName || ''
    }`;

    return (
        <div className='bg-white p-4 rounded-lg shadow-lg'>
            <h3 className='text-lg font-semibold mb-4'>
                Reached the Destination
            </h3>
            <div className='flex items-center mb-4'>
                <img
                    src={
                        user.profilePicture || 'https://via.placeholder.com/150'
                    }
                    alt='Profile'
                    className='w-12 h-12 rounded-full mr-4 object-cover'
                />
                <div>
                    <p className='text-sm font-medium'>{fullName}</p>
                </div>
            </div>
            <div className='mb-4'>
                <p className='text-sm text-gray-600'>Pickup: {pickup}</p>
                <p className='text-sm font-medium'>
                    Destination: {destination}
                </p>
                <p className='text-sm text-gray-600'>
                    Amount: ${fare.toFixed(2)}
                </p>
            </div>
            <div className='font-semibold'>
                <button
                    onClick={() => window.location.reload()}
                    className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full'
                >
                    Finish Ride
                </button>
            </div>
            <span className='text-xs text-red-600'>
                Make sure payment is done before clicking Finish Ride
            </span>
        </div>
    );
};

export default FinishRide;
