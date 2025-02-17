import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import {
    Mail,
    Lock,
    ArrowRight,
    User,
    Car,
    Phone,
    Palette,
    FileText,
} from 'lucide-react';

const Register = () => {
    const [registerToggleUser, setRegisterToggleUser] = useState('user');

    return (
        <div className='h-screen max-w-md mx-auto bg-gray-50 overflow-y-auto'>
            <div className='px-6 py-8'>
                {/* Header */}
                <div className='mb-6'>
                    <h1 className='text-2xl font-bold text-gray-900'>
                        Create Account
                    </h1>
                    <p className='text-gray-600 mt-1'>Join PathaoSync today</p>
                </div>

                {/* Toggle Buttons */}
                <div className='bg-gray-100 p-1 rounded-xl flex mb-8'>
                    <button
                        className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-all ${
                            registerToggleUser === 'user'
                                ? 'bg-white shadow-md text-green-500 font-semibold'
                                : 'text-gray-600 hover:text-gray-800'
                        }`}
                        onClick={() => setRegisterToggleUser('user')}
                    >
                        <User className='w-4 h-4' />
                        Passenger
                    </button>
                    <button
                        className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-all ${
                            registerToggleUser === 'captain'
                                ? 'bg-white shadow-md text-green-500 font-semibold'
                                : 'text-gray-600 hover:text-gray-800'
                        }`}
                        onClick={() => setRegisterToggleUser('captain')}
                    >
                        <Car className='w-4 h-4' />
                        Captain
                    </button>
                </div>

                {registerToggleUser === 'user' ? (
                    <RegisterUser />
                ) : (
                    <RegisterCaptain />
                )}
            </div>
        </div>
    );
};

const InputField = ({ icon: Icon, label, ...props }) => (
    <div className='space-y-1.5'>
        <label
            htmlFor={props.id}
            className='block text-sm font-medium text-gray-700'
        >
            {label}
        </label>
        <div className='relative'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <Icon className='h-5 w-5 text-gray-400' />
            </div>
            <input
                {...props}
                className='block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl 
                text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 
                focus:ring-green-500 focus:border-transparent'
            />
        </div>
    </div>
);

const RegisterUser = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const {
        mutate: registerUser,
        isPending,
        isError,
        error,
    } = useMutation({
        mutationFn: async () => {
            const response = await axios.post('/api/auth/register', formData);
            return response.data;
        },
        onSuccess: () => {
            toast.success('Registered successfully');
            navigate('/login');
        },
        onError: () => {
            toast.error('Registration failed');
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        registerUser();
    };

    return (
        <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='flex gap-4'>
                <InputField
                    icon={User}
                    label='First Name'
                    type='text'
                    id='firstName'
                    name='firstName'
                    placeholder='Enter first name'
                    value={formData.firstName}
                    onChange={handleChange}
                />
                <InputField
                    icon={User}
                    label='Last Name'
                    type='text'
                    id='lastName'
                    name='lastName'
                    placeholder='Enter last name'
                    value={formData.lastName}
                    onChange={handleChange}
                />
            </div>

            <InputField
                icon={Mail}
                label='Email Address'
                type='email'
                id='email'
                name='email'
                placeholder='Enter your email'
                value={formData.email}
                onChange={handleChange}
            />

            <InputField
                icon={Lock}
                label='Password'
                type='password'
                id='password'
                name='password'
                placeholder='Create a password'
                value={formData.password}
                onChange={handleChange}
            />

            {isError && (
                <div className='p-3 rounded-lg bg-red-50 text-red-500 text-sm'>
                    {error?.response?.data?.error ||
                        'Registration failed. Please try again.'}
                </div>
            )}

            <button
                type='submit'
                disabled={isPending}
                className='mt-6 w-full bg-green-500 text-white px-6 py-3.5 rounded-xl font-semibold
                flex items-center justify-center gap-2 shadow-lg shadow-green-500/20
                hover:bg-green-600 transition-colors disabled:opacity-70'
            >
                {isPending ? (
                    <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin' />
                ) : (
                    <>
                        Create Account
                        <ArrowRight className='w-4 h-4' />
                    </>
                )}
            </button>

            <div className='mt-6 text-center'>
                <p className='text-gray-600'>
                    Already have an account?{' '}
                    <button
                        type='button'
                        onClick={() => navigate('/login')}
                        className='text-green-500 font-semibold hover:text-green-600'
                    >
                        Sign In
                    </button>
                </p>
            </div>
        </form>
    );
};

const RegisterCaptain = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phone: '',
        color: '',
        plate: '',
        type: '',
        capacity: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const {
        mutate: registerCaptain,
        isPending,
        isError,
        error,
    } = useMutation({
        mutationFn: async () => {
            const response = await axios.post(
                '/api/captain/register',
                formData
            );
            return response.data;
        },
        onSuccess: () => {
            toast.success('Registered successfully');
            navigate('/login');
        },
        onError: () => {
            toast.error('Registration failed');
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        registerCaptain();
    };

    return (
        <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='flex gap-4'>
                <InputField
                    icon={User}
                    label='First Name'
                    type='text'
                    id='firstName'
                    name='firstName'
                    placeholder='Enter first name'
                    value={formData.firstName}
                    onChange={handleChange}
                />
                <InputField
                    icon={User}
                    label='Last Name'
                    type='text'
                    id='lastName'
                    name='lastName'
                    placeholder='Enter last name'
                    value={formData.lastName}
                    onChange={handleChange}
                />
            </div>

            <InputField
                icon={Mail}
                label='Email Address'
                type='email'
                id='email'
                name='email'
                placeholder='Enter your email'
                value={formData.email}
                onChange={handleChange}
            />

            <InputField
                icon={Phone}
                label='Phone Number'
                type='tel'
                id='phone'
                name='phone'
                placeholder='Enter phone number'
                value={formData.phone}
                onChange={handleChange}
            />

            <InputField
                icon={Lock}
                label='Password'
                type='password'
                id='password'
                name='password'
                placeholder='Create a password'
                value={formData.password}
                onChange={handleChange}
            />

            <div className='grid grid-cols-2 gap-4'>
                <InputField
                    icon={Palette}
                    label='Vehicle Color'
                    type='text'
                    id='color'
                    name='color'
                    placeholder='Enter vehicle color'
                    value={formData.color}
                    onChange={handleChange}
                />
                <InputField
                    icon={FileText}
                    label='Vehicle Plate'
                    type='text'
                    id='plate'
                    name='plate'
                    placeholder='Enter plate number'
                    value={formData.plate}
                    onChange={handleChange}
                />
            </div>

            <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-1.5'>
                    <label className='block text-sm font-medium text-gray-700'>
                        Vehicle Type
                    </label>
                    <select
                        name='type'
                        value={formData.type}
                        onChange={handleChange}
                        className='w-full py-3 px-4 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent'
                    >
                        <option value=''>Select type</option>
                        <option value='car'>Car</option>
                        <option value='motorcycle'>Motorcycle</option>
                        <option value='auto'>Auto</option>
                    </select>
                </div>
                <InputField
                    icon={User}
                    label='Vehicle Capacity'
                    type='number'
                    id='capacity'
                    name='capacity'
                    placeholder='Enter capacity'
                    value={formData.capacity}
                    onChange={handleChange}
                />
            </div>

            {isError && (
                <div className='p-3 rounded-lg bg-red-50 text-red-500 text-sm'>
                    {error?.response?.data?.error ||
                        'Registration failed. Please try again.'}
                </div>
            )}

            <button
                type='submit'
                disabled={isPending}
                className='mt-6 w-full bg-green-500 text-white px-6 py-3.5 rounded-xl font-semibold
                flex items-center justify-center gap-2 shadow-lg shadow-green-500/20
                hover:bg-green-600 transition-colors disabled:opacity-70'
            >
                {isPending ? (
                    <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin' />
                ) : (
                    <>
                        Register as Captain
                        <ArrowRight className='w-4 h-4' />
                    </>
                )}
            </button>

            <div className='mt-6 text-center'>
                <p className='text-gray-600'>
                    Already have an account?{' '}
                    <button
                        type='button'
                        onClick={() => navigate('/login')}
                        className='text-green-500 font-semibold hover:text-green-600'
                    >
                        Sign In
                    </button>
                </p>
            </div>
        </form>
    );
};

export default Register;
