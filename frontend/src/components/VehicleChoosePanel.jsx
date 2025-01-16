import { CgProfile } from 'react-icons/cg';
import car from '../assets/ubercar.png';
import bike from '../assets/bike.png';
import auto from '../assets/auto.png';
import { GiCrossMark } from 'react-icons/gi';

const VehicleChoosePanel = ({
    setConfirmRideOpen,
    setVehiclePanelOpen,
    setSelectedVehicle,
    vehiclePrice,
}) => {
    const vehicles = [
        {
            type: 'car',
            capacity: 4,
            distance: 2,
            price: vehiclePrice.car || 0,
            image: car,
            numberPlate: 'BA 1 JA 1234',
            location: 'Kathmandu, Nepal',
        },
        {
            type: 'motorcycle',
            capacity: 1,
            distance: 5,
            price: vehiclePrice.motorcycle || 0,
            image: bike,
            numberPlate: 'BA 2 JA 5678',
            location: 'Lalitpur, Nepal',
        },
        {
            type: 'auto',
            capacity: 3,
            distance: 3,
            price: vehiclePrice.auto || 0,
            image: auto,
            numberPlate: 'BA 3 JA 9101',
            location: 'Bhaktapur, Nepal',
        },
    ];

    return (
        <div className="p-4">
            <h2 className="font-bold text-2xl mb-4 ml-4">Choose a Vehicle</h2>
            <ul className="flex flex-col gap-4">
                {vehicles.map((vehicle, index) => (
                    <li
                        key={index}
                        className="flex items-center justify-between gap-4 p-1 border-4 rounded-lg cursor-pointer"
                        onClick={() => {
                            setSelectedVehicle(vehicle);
                            setConfirmRideOpen(true);
                        }}
                    >
                        <div className="flex items-center gap-2">
                            <img
                                src={vehicle.image}
                                alt={vehicle.type}
                                className="h-16 w-28"
                            />
                            <div>
                                <div className="flex gap-1 font-medium items-center text-lg">
                                    <h3>{vehicle.type}</h3>
                                    <span className="flex items-center gap-1">
                                        <CgProfile /> {vehicle.capacity}
                                    </span>
                                </div>
                                <span>{vehicle.distance} min away</span>
                            </div>
                        </div>
                        <div className="font-semibold p-2 text-nowrap">
                            {vehicle.price} NPR
                        </div>
                    </li>
                ))}
            </ul>
            <span
                className="absolute top-6 right-8 cursor-pointer text-xl"
                onClick={() => setVehiclePanelOpen(false)}
            >
                <GiCrossMark />
            </span>
        </div>
    );
};

export default VehicleChoosePanel;
