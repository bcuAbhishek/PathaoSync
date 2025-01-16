import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { BsChevronCompactDown } from 'react-icons/bs';

const LookingForDriver = ({ vehicleFound, setVehicleFound }) => {
    const vehicleFoundRef = useRef(null);

    useEffect(() => {
        if (vehicleFound) {
            gsap.to(vehicleFoundRef.current, {
                y: 0,
                opacity: 1,
                visibility: 'visible',
                duration: 0.5,
                ease: 'power3.out',
            });
        } else {
            gsap.to(vehicleFoundRef.current, {
                y: '100%',
                opacity: 0,
                duration: 0.5,
                ease: 'power3.in',
                onComplete: () => {
                    gsap.set(vehicleFoundRef.current, { visibility: 'hidden' });
                },
            });
        }
    }, [vehicleFound]); // Add vehicleFound as a dependency

    return (
        <div
            ref={vehicleFoundRef}
            className='absolute bottom-0 z-10 bg-white w-full p-8'
            style={{ visibility: 'hidden', transform: 'translateY(100%)', opacity: 0 }} // Ensure initial state
        >
            <h3 className='text-xl font-bold mb-4 mt-2'>
                Looking for a Driver
            </h3>
            <div className='flex flex-col'>
                <button
                    className='bg-green-600 text-white text-lg font-semibold p-2 rounded-md mt-4'
                    onClick={() => setVehicleFound(false)}
                >
                    Cancel
                </button>
            </div>

            <div
                className='absolute top-2 transform -translate-x-1/2 left-1/2 text-gray-600 text-3xl font-bold'
                onClick={() => setVehicleFound(false)}
            >
                <BsChevronCompactDown />
            </div>
        </div>
    );
};

export default LookingForDriver;
