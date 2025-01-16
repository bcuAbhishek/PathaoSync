import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [registerToggleUser, setRegisterToggleUser] = useState('user');

    return (
        <div className='max-w-[90%] m-auto space-y-8 mt-8'>
            <h1 className='text-3xl font-semibold'>
                Welcome to <i className='font-bold'>Sasta Pathao</i>
            </h1>
            <div className='p-[6px] bg-slate-100 rounded-lg flex justify-between gap-[6px]'>
                <button
                    className={`px-4 py-3  w-full ${
                        registerToggleUser === 'user'
                            ? 'bg-white rounded-md font-semibold'
                            : ''
                    } `}
                    onClick={() => setRegisterToggleUser('user')}
                >
                    Register as User
                </button>
                <button
                    className={`px-4 py-3  w-full ${
                        registerToggleUser === 'register'
                            ? 'bg-white rounded-md font-semibold'
                            : ''
                    } `}
                    onClick={() => setRegisterToggleUser('register')}
                >
                    Register as Captain
                </button>
            </div>
            {registerToggleUser === 'user' ? (
                <RegisterUser />
            ) : (
                <RegisterCaptain />
            )}
        </div>
    );
};
export default Register;

const RegisterUser = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const {
        mutate: registerUser,
        isError,
        error,
        isPending,
    } = useMutation({
        mutationFn: async () => {
            const response = await axios.post('/api/auth/register', formData);
            return response.data;
        },
        onSuccess: (data) => {
            console.log(data);
            toast.success('User registered successfully');
        },
        onError: (error) => {
            console.log(error.response.data.error);
            toast.error(error.response.data.error);
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        registerUser();
    };

    return (
        <>
            <form
                action=''
                className='flex flex-col gap-4'
                onSubmit={handleSubmit}
            >
                <div className='flex gap-4 w-full'>
                    <div className='flex-1 flex gap-2 flex-col'>
                        <label htmlFor='firstName'>Firstname</label>
                        <input
                            type='text'
                            id='firstName'
                            name='firstName'
                            value={formData.firstName}
                            onChange={handleChange}
                            className='border rounded-md px-4 py-2 w-full outline-none focus:bg-slate-50 shadow-md'
                        />
                    </div>
                    <div className='flex-1 flex gap-2 flex-col'>
                        <label htmlFor='lastName'>Lastname</label>
                        <input
                            type='text'
                            id='lastName'
                            name='lastName'
                            value={formData.lastName}
                            onChange={handleChange}
                            className='border rounded-md px-4 py-2 w-full outline-none focus:bg-slate-50 shadow-md'
                        />
                    </div>
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor='email'>Email</label>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        className='border rounded-md px-4 py-2 outline-none focus:bg-slate-50 shadow-md'
                    />
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        id='password'
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                        className='border rounded-md px-4 py-2 outline-none focus:bg-slate-50 shadow-md'
                    />
                </div>
                {isPending && <div>Registering User...</div>}
                {isError && <div>{error.response.data.message}</div>}
                <button
                    type='submit'
                    className='bg-slate-600 text-white py-2 rounded-md mt-4  font-semibold'
                >
                    Create user{' '}
                </button>
            </form>
            <div className='text-center mt-4'>
                <p>
                    Already have an account?{' '}
                    <button
                        onClick={() => navigate('/login')}
                        className='text-blue-500 underline'
                    >
                        Login
                    </button>
                </p>
            </div>
        </>
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
        isError,
        error,
        isPending,
    } = useMutation({
        mutationFn: async () => {
            const response = await axios.post(
                '/api/captain/register',
                formData
            );
            return response.data;
        },
        onSuccess: (data) => {
            console.log(data);
            toast.success('Captain registered successfully');
        },
        onError: (error) => {
            console.error(error.response.data.message);
            toast.error(error.response.data.message);
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        registerCaptain();
    };

    return (
        <>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                {/* Name Fields */}
                <div className='flex gap-4 w-full'>
                    <div className='flex-1 flex flex-col gap-2'>
                        <label htmlFor='firstName'>First Name</label>
                        <input
                            type='text'
                            id='firstName'
                            name='firstName'
                            value={formData.firstName}
                            onChange={handleChange}
                            className='border rounded-md px-4 py-2 outline-none focus:bg-slate-50 shadow-md w-full'
                        />
                    </div>
                    <div className='flex-1 flex flex-col gap-2'>
                        <label htmlFor='lastName'>Last Name</label>
                        <input
                            type='text'
                            id='lastName'
                            name='lastName'
                            value={formData.lastName}
                            onChange={handleChange}
                            className='border rounded-md px-4 py-2 outline-none focus:bg-slate-50 shadow-md w-full'
                        />
                    </div>
                </div>

                {/* Contact Fields */}
                <div className='flex flex-col gap-2'>
                    <label htmlFor='email'>Email</label>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        className='border rounded-md px-4 py-2 outline-none focus:bg-slate-50 shadow-md'
                    />
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor='phone'>Phone</label>
                    <input
                        type='text'
                        id='phone'
                        name='phone'
                        value={formData.phone}
                        onChange={handleChange}
                        className='border rounded-md px-4 py-2 outline-none focus:bg-slate-50 shadow-md'
                    />
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        id='password'
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                        className='border rounded-md px-4 py-2 outline-none focus:bg-slate-50 shadow-md'
                    />
                </div>

                {/* Vehicle Details */}
                <div className='flex flex-wrap gap-4 w-full'>
                    <div className='flex-1 flex flex-col gap-2'>
                        <label htmlFor='color'>Vehicle Color</label>
                        <input
                            type='text'
                            id='color'
                            name='color'
                            value={formData.color}
                            onChange={handleChange}
                            className='border rounded-md px-4 py-2 outline-none focus:bg-slate-50 shadow-md w-full'
                        />
                    </div>
                    <div className='flex-1 flex flex-col gap-2'>
                        <label htmlFor='plate'>Vehicle Plate</label>
                        <input
                            type='text'
                            id='plate'
                            name='plate'
                            value={formData.plate}
                            onChange={handleChange}
                            className='border rounded-md px-4 py-2 outline-none focus:bg-slate-50 shadow-md w-full'
                        />
                    </div>
                </div>

                <div className='flex flex-wrap gap-4 w-full'>
                    <div className='flex-1 flex flex-col gap-2'>
                        <label htmlFor='type'>Vehicle Type</label>
                        <select
                            id='type'
                            name='type'
                            value={formData.type}
                            onChange={handleChange}
                            className='border rounded-md px-4 py-2 outline-none focus:bg-slate-50 shadow-md w-full'
                        >
                            <option value='' disabled>
                                Select a type
                            </option>
                            <option value='car'>Car</option>
                            <option value='motorcycle'>Motorcycle</option>
                            <option value='auto'>Auto</option>
                        </select>
                    </div>
                    <div className='flex-1 flex flex-col gap-2'>
                        <label htmlFor='capacity'>Vehicle Capacity</label>
                        <input
                            type='text'
                            id='capacity'
                            name='capacity'
                            value={formData.capacity}
                            onChange={handleChange}
                            className='border rounded-md px-4 py-2 outline-none focus:bg-slate-50 shadow-md w-full'
                        />
                    </div>
                </div>

                {/* Submit Button */}
                {isPending && <div>Registering Captain...</div>}
                {isError && <div>{error.response?.data?.message}</div>}
                <button
                    type='submit'
                    className='bg-slate-600 text-white py-2 rounded-md mt-4 font-semibold'
                >
                    Create Captain
                </button>
            </form>
            <div className='text-center mt-4'>
                <p>
                    Already have an account?{' '}
                    <button
                        onClick={() => navigate('/login')}
                        className='text-blue-500 underline'
                    >
                        Login
                    </button>
                </p>
            </div>
        </>
    );
};
