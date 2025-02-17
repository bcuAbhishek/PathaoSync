import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Bike, Car, MapPin } from 'lucide-react';

const Start = () => {
    const navigate = useNavigate();

    return (
        <div
            style={{
                backgroundImage:
                    'url(https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?auto=format&fit=crop&q=80)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '375px',
                height: '667px',
                margin: '0 auto',
            }}
            className='relative flex flex-col overflow-y-auto'
        >
            {/* Overlay with gradient */}
            <div className='absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70' />

            {/* Content */}
            <div className='relative z-10 flex flex-col h-full px-4 py-6'>
                {/* Header */}
                <div className='flex items-center gap-2'>
                    <div className='bg-green-500 p-1.5 rounded-lg'>
                        <Bike className='w-6 h-6 text-white' />
                    </div>
                    <h1 className='text-white text-2xl font-bold'>
                        PathaoSync
                    </h1>
                </div>

                {/* Main Content */}
                <div className='flex-1 flex flex-col items-center justify-center text-center mt-8'>
                    <h2 className='text-3xl font-bold text-white mb-4 leading-tight'>
                        Your Smart
                        <span className='text-green-500'> Transportation</span>
                        <br />
                        Partner
                    </h2>
                    <p className='text-base text-gray-200 mb-8'>
                        Connect with reliable rides instantly. Experience the
                        future of urban mobility.
                    </p>
                    <div className='flex flex-col gap-3 w-full'>
                        <button
                            onClick={() => navigate('/register')}
                            className='group bg-green-500 text-white px-6 py-3 rounded-full font-semibold text-base transition-all active:bg-green-600 flex items-center justify-center gap-2 shadow-lg shadow-green-500/20'
                        >
                            Get Started
                            <ArrowRight className='w-4 h-4 transition-transform group-hover:translate-x-1' />
                        </button>
                        <button
                            onClick={() => navigate('/login')}
                            className='px-6 py-3 rounded-full font-semibold text-base transition-all text-white active:bg-white/10 flex items-center justify-center gap-2 border border-white/20'
                        >
                            Login
                        </button>
                    </div>
                </div>

                {/* Features */}
            </div>
        </div>
    );
};

export default Start;
