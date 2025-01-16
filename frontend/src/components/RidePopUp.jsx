const RidePopUp = ({
    setRidePopUpPanel,
    setConfirmRideOfPassenger,
    rideData,
    confirmRide,
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

    return (
        <div className=' flex items-center justify-center z-50'>
            <div className='bg-white rounded-t-xl shadow-2xl w-full max-w-md animate-in fade-in zoom-in duration-300'>
                {/* Header */}
                <div className='p-5 border-b border-gray-200'>
                    <div className='flex items-center justify-between'>
                        <h3 className='text-lg font-bold text-gray-900'>
                            New Ride Request
                        </h3>
                        <span className='inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700'>
                            Fare: ${fare}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className='p-5 space-y-6'>
                    {/* Passenger Info */}
                    <div className='flex items-center space-x-4'>
                        <img
                            src='https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
                            alt='Passenger'
                            className='w-14 h-14 rounded-full object-cover ring-2 ring-gray-300'
                        />
                        <div>
                            <h4 className='text-lg font-medium text-gray-800'>
                                {fullName}
                            </h4>
                            <div className='flex items-center text-sm text-gray-500'>
                                <svg
                                    className='w-4 h-4 mr-1'
                                    fill='none'
                                    stroke='currentColor'
                                    strokeWidth='2'
                                    viewBox='0 0 24 24'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        d='M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207'
                                    />
                                </svg>
                                Verified Passenger
                            </div>
                        </div>
                    </div>

                    {/* Route Details */}
                    <div className='space-y-4'>
                        <div className='flex items-center space-x-3'>
                            <div className='flex-shrink-0'>
                                <div className='w-3 h-3 rounded-full bg-green-500'></div>
                            </div>
                            <div>
                                <p className='text-sm text-gray-500'>
                                    Pickup Location
                                </p>
                                <p className='text-base font-medium text-gray-900'>
                                    {pickup}
                                </p>
                            </div>
                        </div>
                        <div className='flex items-center space-x-3'>
                            <div className='flex-shrink-0'>
                                <div className='w-3 h-3 rounded-full bg-red-500'></div>
                            </div>
                            <div>
                                <p className='text-sm text-gray-500'>
                                    Destination
                                </p>
                                <p className='text-base font-medium text-gray-900'>
                                    {destination}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className='p-5 bg-gray-50 rounded-b-xl border-t border-gray-200 flex space-x-4'>
                    <button
                        onClick={() => setRidePopUpPanel(false)}
                        className='w-full py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-200'
                    >
                        Decline
                    </button>
                    <button
                        onClick={() => {
                            setConfirmRideOfPassenger(true);
                            confirmRide();
                        }}
                        className='w-full py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200'
                    >
                        Accept Ride
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RidePopUp;
