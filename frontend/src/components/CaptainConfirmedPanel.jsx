const CaptainConfirmedPanel = ({
    confirmedCaptainData,
}) => {
    const {
        captain = {
            fullName: { firstName: 'N/A', lastName: 'N/A' },
            phone: 'N/A',
            vehicle: {
                type: 'Unknown',
                color: 'Unknown',
                plate: 'Unknown',
                capacity: '0',
            },
        },
        ride = {
            status: 'Pending',
            pickup: 'Unknown',
            destination: 'Unknown',
            fare: '0',
            otp: '0000',
        },
    } = confirmedCaptainData;

    return (
        <div className='fixed inset-x-0 bottom-0 bg-white rounded-t-xl shadow-2xl max-h-[85vh] overflow-y-auto'>
            {/* Header */}
            <div className='sticky top-0 bg-white border-b z-10'>
                <div className='w-12 h-1 bg-gray-300 rounded-full mx-auto my-3' />
                <div className='px-4 pb-4'>
                    <div className='flex items-center justify-between'>
                        <div>
                            <h2 className='text-lg font-semibold text-gray-900'>
                                Your Ride is Confirmed!
                            </h2>
                            <p className='text-sm text-gray-500'>
                                Captain is on the way
                            </p>
                        </div>
                        <span className='inline-flex items-center rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20'>
                            {ride.status}
                        </span>
                    </div>
                </div>
            </div>

            <div className='px-4 py-4 space-y-4'>
                {/* Captain Info */}
                <div className='flex items-center space-x-3'>
                    <div className='h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center'>
                        <svg
                            className='w-6 h-6 text-gray-500'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                            />
                        </svg>
                    </div>
                    <div>
                        <h3 className='font-medium text-gray-900'>
                            {captain.fullName.firstName}{' '}
                            {captain.fullName.lastName}
                        </h3>
                        <p className='text-sm text-gray-500'>{captain.phone}</p>
                    </div>
                </div>
                <span>
                    OTP: <span className='font-medium'>{ride.otp}</span>
                </span>

                {/* Vehicle Info */}
                <div className='bg-blue-50 rounded-lg p-3'>
                    <div className='grid grid-cols-4 gap-2 text-sm'>
                        <div>
                            <p className='text-blue-700'>Vehicle</p>
                            <p className='font-medium text-blue-900'>
                                {captain.vehicle.type}
                            </p>
                        </div>
                        <div>
                            <p className='text-blue-700'>Color</p>
                            <p className='font-medium text-blue-900'>
                                {captain.vehicle.color}
                            </p>
                        </div>
                        <div>
                            <p className='text-blue-700'>Plate</p>
                            <p className='font-medium text-blue-900'>
                                {captain.vehicle.plate}
                            </p>
                        </div>
                        <div>
                            <p className='text-blue-700'>Capacity</p>
                            <p className='font-medium text-blue-900'>
                                {captain.vehicle.capacity} seats
                            </p>
                        </div>
                    </div>
                </div>

                {/* Route */}
                <div className='space-y-3'>
                    <div className='flex items-start space-x-3'>
                        <div className='mt-1'>
                            <div className='w-2 h-2 rounded-full bg-green-500' />
                        </div>
                        <div>
                            <p className='text-sm text-gray-500'>Pickup</p>
                            <p className='text-gray-900'>{ride.pickup}</p>
                        </div>
                    </div>
                    <div className='flex items-start space-x-3'>
                        <div className='mt-1'>
                            <div className='w-2 h-2 rounded-full bg-red-500' />
                        </div>
                        <div>
                            <p className='text-sm text-gray-500'>Destination</p>
                            <p className='text-gray-900'>{ride.destination}</p>
                        </div>
                    </div>
                </div>

                {/* Fare */}
                <div className='flex justify-between items-center bg-gray-50 rounded-lg p-3'>
                    <div>
                        <p className='text-sm text-gray-500'>Total Fare</p>
                        <p className='text-xl font-semibold text-gray-900'>
                            NPR {ride.fare}
                        </p>
                    </div>
                    <div className='text-right'>
                        <p className='text-sm text-gray-500'>Payment</p>
                        <p className='font-medium text-gray-900'>Cash</p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default CaptainConfirmedPanel;
