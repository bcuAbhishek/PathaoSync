import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { ChevronDown, MapPin, Navigation } from 'lucide-react';
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

    const { mutate: fetchPickupSuggestions } = useMutation({
        mutationFn: async (input) => {
            if (!input) throw new Error('Input is required');
            const response = await axios.get('/api/maps/get-suggestion', {
                params: { input },
            });
            return response.data;
        },
        onSuccess: (data) => {
            setPickupSuggestions(data);
        },
        onError: (error) => {
            console.error('Error fetching pickup suggestions:', error.message);
        },
    });

    const { mutate: fetchDestinationSuggestions } = useMutation({
        mutationFn: async (input) => {
            if (!input) throw new Error('Input is required');
            const response = await axios.get('/api/maps/get-suggestion', {
                params: { input },
            });
            return response.data;
        },
        onSuccess: (data) => {
            setDestinationSuggestions(data);
        },
        onError: (error) => {
            console.error(
                'Error fetching destination suggestions:',
                error.message
            );
        },
    });

    const handlePickupChange = (e) => {
        const value = e.target.value;
        setPickupInput(value);
        if (value) {
            fetchPickupSuggestions(value);
        } else {
            setPickupSuggestions([]);
        }
    };

    const handleDestinationChange = (e) => {
        const value = e.target.value;
        setDestinationInput(value);
        if (value) {
            fetchDestinationSuggestions(value);
        } else {
            setDestinationSuggestions([]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (pickupInput && destinationInput) {
            handleVehiclePrice();
            setVehiclePanelOpen(true);
        }
    };

    return (
        <div className='relative bg-white rounded-t-3xl'>
            {/* Handle */}
            <div className='absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-gray-300 rounded-full' />

            {/* Panel Toggle */}
            <div className='absolute right-4 top-4'>
                <button
                    onClick={() => setPanelOpen(false)}
                    className={`p-2 hover:bg-gray-100 rounded-full transition-colors ${
                        PanelOpen ? 'visible' : 'invisible'
                    }`}
                >
                    <ChevronDown className='w-5 h-5 text-gray-600' />
                </button>
            </div>

            <div className='p-4 pt-4'>
                <h3 className='text-2xl font-bold text-gray-900 mb-6'>
                    Where to?
                </h3>

                <form onSubmit={handleSubmit} className='space-y-4'>
                    {/* Location Inputs Container */}
                    <div className='relative'>
                        {/* Connecting Line */}
                        <div className='absolute left-[22px] top-[42px] w-0.5 h-16 bg-gray-300' />

                        {/* Pickup Input */}
                        <div className='relative mb-4'>
                            <div className='absolute left-0 top-1/2 -translate-y-1/2 p-2'>
                                <Navigation className='w-5 h-5 text-green-500' />
                            </div>
                            <input
                                value={pickupInput}
                                onClick={() => setPanelOpen(true)}
                                onChange={handlePickupChange}
                                type='text'
                                className='w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl 
                                         text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 
                                         focus:ring-green-500 focus:border-transparent transition-all'
                                placeholder='Enter pickup location'
                            />
                            {PanelOpen && pickupSuggestions.length > 0 && (
                                <LocationPanel
                                    suggestions={pickupSuggestions}
                                    setInput={setPickupInput}
                                    setSuggestions={setPickupSuggestions}
                                />
                            )}
                        </div>

                        {/* Destination Input */}
                        <div className='relative'>
                            <div className='absolute left-0 top-1/2 -translate-y-1/2 p-2'>
                                <MapPin className='w-5 h-5 text-red-500' />
                            </div>
                            <input
                                value={destinationInput}
                                onClick={() => setPanelOpen(true)}
                                onChange={handleDestinationChange}
                                type='text'
                                className='w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl 
                                         text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 
                                         focus:ring-green-500 focus:border-transparent transition-all'
                                placeholder='Where to?'
                            />
                            {PanelOpen && destinationSuggestions.length > 0 && (
                                <LocationPanel
                                    suggestions={destinationSuggestions}
                                    setInput={setDestinationInput}
                                    setSuggestions={setDestinationSuggestions}
                                />
                            )}
                        </div>
                    </div>

                    {/* Search Button */}
                    <button
                        type='submit'
                        className='w-full py-3 bg-green-500 text-white font-semibold rounded-xl
                                  hover:bg-green-600 
                                 active:transform active:scale-[0.98] transition-all
                                 disabled:opacity-70 disabled:cursor-not-allowed'
                        disabled={!pickupInput || !destinationInput}
                    >
                        Search Rides
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SearchLocation;
