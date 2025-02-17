import { Loader2, MapPin, Radio, Shield, X } from 'lucide-react';

const SearchingForPassenger = ({ setSearchForPassenger, exactLocation }) => {
    return (
        <div className='p-4'>
            <div className='max-w-md mx-auto'>
                {/* Header */}
                <div className='flex justify-between items-center mb-8'>
                    <h1 className='text-2xl font-bold text-gray-800'>
                        Finding Passengers
                    </h1>
                    <button
                        onClick={() => setSearchForPassenger(false)}
                        className='p-2 hover:bg-gray-100 rounded-full transition-colors'
                    >
                        <X className='w-6 h-6 text-gray-600' />
                    </button>
                </div>

                {/* Search Animation */}
                <div className='relative flex justify-center mb-12'>
                    <div className='absolute inset-0 flex items-center justify-center'>
                        <div className='w-32 h-32 border-4 border-green-200 rounded-full animate-ping opacity-75' />
                        <div className='w-24 h-24 border-4 border-green-300 rounded-full animate-ping opacity-75 absolute' />
                        <div className='w-16 h-16 border-4 border-green-400 rounded-full animate-ping opacity-75 absolute' />
                    </div>
                    <div className='relative bg-white p-4 rounded-full shadow-lg'>
                        <Loader2 className='w-12 h-12 text-green-500 animate-spin' />
                    </div>
                </div>

                {/* Search Status */}
                <div className='text-center mb-8'>
                    <p className='text-gray-600 text-lg mb-2'>
                        Searching for nearby passengers
                    </p>
                </div>

                {/* Current Location */}
                <div className='bg-white rounded-lg shadow-sm p-4 mb-6'>
                    <div className='flex items-center gap-3 text-gray-700'>
                        <MapPin className='w-5 h-5 text-green-500' />
                        <span>Current Location:</span>
                    </div>
                    <p className='ml-8 text-gray-600'>
                        {exactLocation || 'Fetching location...'}
                    </p>
                </div>

                {/* Status Cards */}
                <div className='grid grid-cols-2 gap-4 mb-8'>
                    <div className='bg-white rounded-lg p-4 shadow-sm'>
                        <div className='flex items-center gap-2 mb-2'>
                            <Radio className='w-5 h-5 text-green-500' />
                            <span className='font-medium text-gray-700'>
                                Signal Strength
                            </span>
                        </div>
                        <div className='flex gap-1'>
                            <div className='flex-1 h-2 bg-green-500 rounded' />
                            <div className='flex-1 h-2 bg-green-500 rounded' />
                            <div className='flex-1 h-2 bg-green-500 rounded' />
                            <div className='flex-1 h-2 bg-gray-200 rounded' />
                        </div>
                    </div>

                    <div className='bg-white rounded-lg p-4 shadow-sm'>
                        <div className='flex items-center gap-2 mb-2'>
                            <Shield className='w-5 h-5 text-green-500' />
                            <span className='font-medium text-gray-700'>
                                Safety Status
                            </span>
                        </div>
                        <p className='text-green-600'>Area Verified ✓</p>
                    </div>
                </div>

                {/* Cancel Button */}
                <button
                    onClick={() => setSearchForPassenger(false)}
                    className='w-full bg-white border-2 border-gray-200 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200'
                >
                    Cancel Search
                </button>
            </div>
        </div>
    );
};

export default SearchingForPassenger;
