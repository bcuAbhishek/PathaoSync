import { RiUserLocationFill } from 'react-icons/ri';
import { ImLocation2 } from 'react-icons/im';
import { BsCashCoin } from 'react-icons/bs';
import { BsChevronCompactDown } from 'react-icons/bs';

const ConfirmRide = ({
    setConfirmRideOpen,
    setVehicleFound,
    pickupInput,
    selectedVehicle,
    confirmRide,
}) => {
    // Check if selectedVehicle is null or undefined
    if (!selectedVehicle) {
        return (
            <div className='p-8'>
                <h3 className='text-xl font-bold mb-4 mt-2'>
                    Please select a vehicle
                </h3>
            </div>
        );
    }

    return (
        <div className='p-8'>
            <h3 className='text-xl font-bold mb-4 mt-2'>Confirm your Ride</h3>
            <img
                src={selectedVehicle.image}
                alt={selectedVehicle.type}
                className='h-20 w-36 mx-auto'
            />
            <div className='flex flex-col'>
                <div className='flex items-center gap-4 border-b-2 border-gray-300 p-2'>
                    <ImLocation2 />

                    <div className='flex flex-col '>
                        <p className='text-lg font-medium'>
                            {selectedVehicle.numberPlate}
                        </p>
                        <span>{selectedVehicle.location}</span>
                    </div>
                </div>
                <div className='flex items-center gap-4 border-b-2 border-gray-300 p-2'>
                    <RiUserLocationFill />
                    <div>
                        <p className='text-lg font-medium'>Your Location</p>
                        <span>{pickupInput}</span>
                    </div>
                </div>
                <div className='flex items-center gap-4 p-2'>
                    <BsCashCoin />
                    <div>
                        <p className='text-lg font-medium'>Fare Price</p>
                        <span>{selectedVehicle.price} NPR</span>
                    </div>
                </div>
                <button
                    onClick={() => {
                        setVehicleFound(true);
                        confirmRide();
                    }}
                    className='bg-green-600 text-white text-lg font-semibold p-2 rounded-md mt-4'
                >
                    Confirm
                </button>
            </div>
            <div
                className='absolute top-2 transform -translate-x-1/2 left-1/2 text-gray-600 text-3xl font-bold '
                onClick={() => setConfirmRideOpen(false)}
            >
                <BsChevronCompactDown />
            </div>
        </div>
    );
};

export default ConfirmRide;
