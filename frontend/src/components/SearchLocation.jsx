import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { BsChevronCompactDown } from 'react-icons/bs';
import LocationPanel from './LocationPanel';


const SearchLocation = ({
    PanelOpen,
    setPanelOpen,
    setVehiclePanelOpen,
    pickupInput,
    setPickupInput,
    destinationInput,
    setDestinationInput,
    handleVehiclePrice,
}) => {
    const [pickupSuggestions, setPickupSuggestions] = useState([]);
    const [destinationSuggestions, setDestinationSuggestions] = useState([]);

    // Mutation to fetch suggestions for pickup
    const { mutate: fetchPickupSuggestions } = useMutation({
        mutationFn: async (input) => {
            if (!input) throw new Error('Input is required');
            const response = await axios.get('/api/maps/get-suggestion', {
                params: { input },
            });
            return response.data;
        },
        onSuccess: (data) => {
            setPickupSuggestions(data); // Update pickup suggestions
        },
        onError: (error) => {
            console.error('Error fetching pickup suggestions:', error.message);
        },
    });

    // Mutation to fetch suggestions for destination
    const { mutate: fetchDestinationSuggestions } = useMutation({
        mutationFn: async (input) => {
            if (!input) throw new Error('Input is required');
            const response = await axios.get('/api/maps/get-suggestion', {
                params: { input },
            });
            return response.data;
        },
        onSuccess: (data) => {
            setDestinationSuggestions(data); // Update destination suggestions
        },
        onError: (error) => {
            console.error(
                'Error fetching destination suggestions:',
                error.message
            );
        },
    });

    // Handle input change for pickup location
    const handlePickupChange = (e) => {
        const value = e.target.value;
        setPickupInput(value);
        if (value) {
            fetchPickupSuggestions(value); // Fetch pickup suggestions
        } else {
            setPickupSuggestions([]); // Clear suggestions
        }
    };

    // Handle input change for destination location
    const handleDestinationChange = (e) => {
        const value = e.target.value;
        setDestinationInput(value);
        if (value) {
            fetchDestinationSuggestions(value); // Fetch destination suggestions
        } else {
            setDestinationSuggestions([]); // Clear suggestions
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (pickupInput && destinationInput) {
            setVehiclePanelOpen(true);
        } else {
            alert('Please enter both pickup and destination locations.');
        }
    };

    return (
        <div className='p-4'>
            <h3 className='text-2xl font-bold mb-4'>Find your destination</h3>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                {/* Pickup Location Input */}
                <div className='relative'>
                    <input
                        value={pickupInput}
                        onClick={() => setPanelOpen(true)}
                        onChange={handlePickupChange}
                        type='text'
                        className='input-box pl-8 w-full'
                        placeholder='Add a pick-up location'
                    />
                    {PanelOpen && (
                        <LocationPanel
                            suggestions={pickupSuggestions}
                            setInput={setPickupInput}
                            setSuggestions={setPickupSuggestions}
                        />
                    )}
                </div>

                {/* Destination Location Input */}
                <div className='relative'>
                    <input
                        value={destinationInput}
                        onClick={() => setPanelOpen(true)}
                        onChange={handleDestinationChange}
                        type='text'
                        className='input-box pl-8 w-full'
                        placeholder='Add a destination'
                    />
                    {PanelOpen && (
                        <LocationPanel
                            suggestions={destinationSuggestions}
                            setInput={setDestinationInput}
                            setSuggestions={setDestinationSuggestions}
                        />
                    )}
                </div>

                <button
                    type='submit'
                    className='bg-black text-white text-lg font-semibold p-2 rounded-md'
                    onClick={handleVehiclePrice}
                >
                    Search for Rides
                </button>
            </form>

            {/* Divider Line */}
            <div className='bg-black h-16 w-[1.5px] absolute top-20 left-8'></div>

            {/* Panel Toggle Icon */}
            <BsChevronCompactDown
                className={`size-6 absolute top-5 right-8 ${
                    PanelOpen ? 'visible' : 'hidden'
                }`}
                onClick={() => setPanelOpen(false)}
                style={{ strokeWidth: 0.6 }}
            />
        </div>
    );
};

export default SearchLocation;
