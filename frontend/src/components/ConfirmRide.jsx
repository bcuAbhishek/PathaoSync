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
    if (!selectedVehicle) {
        return (
            <div className="p-8 bg-white rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-gray-800 text-center">
                    Please select a vehicle
                </h3>
            </div>
        );
    }

    return (
        <div className="relative p-8 bg-white rounded-lg shadow-md max-w-lg mx-auto">
            {/* Header and Close Button */}
            <div className="relative text-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">Confirm your Ride</h3>
                <div 
                    className="absolute top-0 left-1/2 -translate-x-1/2 cursor-pointer hover:bg-gray-100 p-2 rounded-full"
                    onClick={() => setConfirmRideOpen(false)}
                >
                    <BsChevronCompactDown className="text-2xl text-gray-600" />
                </div>
            </div>

            {/* Vehicle Image */}
            <img
                src={selectedVehicle.image}
                alt={selectedVehicle.type}
                className="h-20 w-36 mx-auto mb-6 object-contain"
            />

            {/* Ride Details */}
            <div className="flex flex-col space-y-2">
                {/* Vehicle Location */}
                <div className="flex items-center gap-4 p-3 border-b-2 border-gray-200">
                    <ImLocation2 className="text-blue-600 text-xl flex-shrink-0" />
                    <div className="flex flex-col">
                        <p className="text-lg font-medium text-gray-800">
                            {selectedVehicle.numberPlate}
                        </p>
                        <span className="text-gray-600">{selectedVehicle.location}</span>
                    </div>
                </div>

                {/* Pickup Location */}
                <div className="flex items-center gap-4 p-3 border-b-2 border-gray-200">
                    <RiUserLocationFill className="text-green-600 text-xl flex-shrink-0" />
                    <div className="flex flex-col">
                        <p className="text-lg font-medium text-gray-800">Your Location</p>
                        <span className="text-gray-600">{pickupInput}</span>
                    </div>
                </div>

                {/* Fare Details */}
                <div className="flex items-center gap-4 p-3">
                    <BsCashCoin className="text-yellow-600 text-xl flex-shrink-0" />
                    <div className="flex flex-col">
                        <p className="text-lg font-medium text-gray-800">Fare Price</p>
                        <span className="text-gray-600">{selectedVehicle.price} NPR</span>
                    </div>
                </div>
            </div>

            {/* Confirm Button */}
            <button
                onClick={() => {
                    setVehicleFound(true);
                    confirmRide();
                }}
                className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white text-lg font-semibold p-3 rounded-lg transition-colors"
            >
                Confirm
            </button>
        </div>
    );
};

export default ConfirmRide;