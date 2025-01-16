const RideOn = ({ setFinishRide }) => {
    return (
        <div className='bg-orange-400 flex justify-between items-center px-8 py-12 text-xl'>
            <span className=' font-semibold'>1.1 KM</span>
            <button
                className='px-4 py-2 rounded-lg text-white bg-green-500 font-bold'
                onClick={() => setFinishRide(true)}
            >
                Confirm Ride
            </button>
        </div>
    );
};

export default RideOn;
