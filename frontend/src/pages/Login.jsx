import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Mail, Lock, ArrowRight, User, Car } from 'lucide-react';

const Login = () => {
    const [loginToggleUser, setLoginToggleUser] = useState('user');

    return (
        <div className='h-[667px] w-[375px] bg-gray-50 overflow-y-auto'>
            <div className='px-6 py-8'>
                {/* Header */}
                <div className='mb-6'>
                    <h1 className='text-2xl font-bold text-gray-900'>
                        Welcome Back
                    </h1>
                    <p className='text-gray-600 mt-1'>
                        Sign in to continue using PathaoSync
                    </p>
                </div>

                {/* Toggle Buttons */}
                <div className='bg-gray-100 p-1 rounded-xl flex mb-8'>
                    <button
                        className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-all ${
                            loginToggleUser === 'user'
                                ? 'bg-white shadow-md text-green-500 font-semibold'
                                : 'text-gray-600 hover:text-gray-800'
                        }`}
                        onClick={() => setLoginToggleUser('user')}
                    >
                        <User className='w-4 h-4' />
                        Passenger
                    </button>
                    <button
                        className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-all ${
                            loginToggleUser === 'captain'
                                ? 'bg-white shadow-md text-green-500 font-semibold'
                                : 'text-gray-600 hover:text-gray-800'
                        }`}
                        onClick={() => setLoginToggleUser('captain')}
                    >
                        <Car className='w-4 h-4' />
                        Captain
                    </button>
                </div>

                {loginToggleUser === 'user' ? <LoginUser /> : <LoginCaptain />}
            </div>
        </div>
    );
};

const LoginForm = ({
    formData,
    handleSubmit,
    handleChange,
    isPending,
    isError,
    error,
    userType,
}) => {
    const navigate = useNavigate();

    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            {/* Email Input */}
            <div className='space-y-1.5'>
                <label
                    htmlFor='email'
                    className='block text-sm font-medium text-gray-700'
                >
                    Email Address
                </label>
                <div className='relative'>
                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                        <Mail className='h-5 w-5 text-gray-400' />
                    </div>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        className='block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl 
                     text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 
                     focus:ring-green-500 focus:border-transparent'
                        placeholder='Enter your email'
                    />
                </div>
            </div>

            {/* Password Input */}
            <div className='space-y-1.5'>
                <label
                    htmlFor='password'
                    className='block text-sm font-medium text-gray-700'
                >
                    Password
                </label>
                <div className='relative'>
                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                        <Lock className='h-5 w-5 text-gray-400' />
                    </div>
                    <input
                        type='password'
                        id='password'
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                        className='block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl 
                     text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 
                     focus:ring-green-500 focus:border-transparent'
                        placeholder='Enter your password'
                    />
                </div>
            </div>

            {/* Error Message */}
            {isError && (
                <div className='p-3 rounded-lg bg-red-50 text-red-500 text-sm'>
                    {error?.response?.data?.error ||
                        'An error occurred. Please try again.'}
                </div>
            )}

            {/* Submit Button */}
            <button
                type='submit'
                disabled={isPending}
                className='mt-4 w-full bg-green-500 text-white px-6 py-3.5 rounded-xl font-semibold
                 flex items-center justify-center gap-2 shadow-lg shadow-green-500/20
                 hover:bg-green-600 transition-colors disabled:opacity-70'
            >
                {isPending ? (
                    <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin' />
                ) : (
                    <>
                        Sign In as {userType}
                        <ArrowRight className='w-4 h-4' />
                    </>
                )}
            </button>

            {/* Register Link */}
            <div className='mt-6 text-center space-y-4'>
                <p className='text-gray-600'>
                    Don't have an account?{' '}
                    <button
                        type='button'
                        onClick={() => navigate('/register')}
                        className='text-green-500 font-semibold hover:text-green-600'
                    >
                        Create Account
                    </button>
                </p>
                <button
                    type='button'
                    onClick={() => navigate('/forgot-password')}
                    className='text-sm text-gray-500 hover:text-gray-600'
                >
                    Forgot your password?
                </button>
            </div>
        </form>
    );
};

const LoginUser = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const {
        mutate: loginUser,
        isPending,
        isError,
        error,
    } = useMutation({
        mutationFn: async () => {
            const response = await axios.post('/api/auth/login', formData);
            return response.data;
        },
        onSuccess: async (data) => {
            toast.success('Logged in successfully');
            await queryClient.invalidateQueries(['authUser']);
            navigate('/home');
        },
        onError: () => {
            toast.error('Failed to login');
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        loginUser();
    };

    return (
        <LoginForm
            formData={formData}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            isPending={isPending}
            isError={isError}
            error={error}
            userType='Passenger'
        />
    );
};

const LoginCaptain = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const {
        mutate: loginCaptain,
        isPending,
        isError,
        error,
    } = useMutation({
        mutationFn: async () => {
            const response = await axios.post('/api/captain/login', formData);
            return response.data;
        },
        onSuccess: async (data) => {
            toast.success('Logged in successfully');
            await queryClient.invalidateQueries(['captainAuthUser']);
            navigate('/chome');
        },
        onError: () => {
            toast.error('Failed to login');
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        loginCaptain();
    };

    return (
        <LoginForm
            formData={formData}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            isPending={isPending}
            isError={isError}
            error={error}
            userType='Captain'
        />
    );
};

export default Login;
