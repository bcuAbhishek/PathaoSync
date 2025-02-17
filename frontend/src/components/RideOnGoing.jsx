const RideOnGoing = ({ ongoingRideData }) => {
    const {
        destination = '',
        fare = '',
        pickup = '',
        status = 'accepted',
    } = ongoingRideData.ride || {};

    return (
        <div className='flex flex-col justify-center bg-white p-4'>
            <h1 className='text-2xl font-bold mb-4'>Ride Ongoing</h1>
            <div className='mb-5 p-5 border border-gray-300 rounded-lg bg-white'>
                <p>Pickup Location: {pickup}</p>
                <p>Destination: {destination}</p>
                <p>Fare: ${fare}</p>

                <p>Status: {status}</p>
            </div>

            <button
                className='px-5 py-2 text-white bg-green-500 rounded cursor-pointer'
                onClick={() => {
                    window.location.reload();
                }}
            >
                Make Payment
            </button>
        </div>
    );
};

export default RideOnGoing;
