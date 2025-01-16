import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [loginToggleUser, setLoginToggleUser] = useState('user');

    return (
        <div className='max-w-[90%] mx-auto mt-8 space-y-8'>
            <h1 className='text-3xl font-semibold'>
                Login to <i className='font-bold'>Sasta Pathao</i>
            </h1>
            <div className='p-[6px] bg-slate-100 rounded-lg flex justify-between gap-[6px]'>
                <button
                    className={`px-4 py-3  w-full ${
                        loginToggleUser === 'user'
                            ? 'bg-white rounded-md font-semibold'
                            : ''
                    } `}
                    onClick={() => setLoginToggleUser('user')}
                >
                    Login as User
                </button>
                <button
                    className={`px-4 py-3  w-full ${
                        loginToggleUser === 'register'
                            ? 'bg-white rounded-md font-semibold'
                            : ''
                    } `}
                    onClick={() => setLoginToggleUser('register')}
                >
                    Login as Captain
                </button>
            </div>
            {loginToggleUser === 'user' ? <LoginUser /> : <LoginCaptain />}
        </div>
    );
};

export default Login;

const LoginUser = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient(); // Initialize query client
    const [formData, setFormData] = useState({
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
            console.log(data);
            toast.success('Logged in successfully');

            // Refetch the `authUser` query to get the updated user data
            await queryClient.invalidateQueries(['authUser']);

            // Navigate to home after successful login
            navigate('/home');
        },
        onError: (error) => {
            console.log(error);
            toast.error('Failed to login');
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        loginUser();
    };

    return (
        <>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <div className='flex flex-col gap-2'>
                    <label htmlFor='email' className='font-medium'>
                        Email
                    </label>
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
                    <label htmlFor='password' className='font-medium'>
                        Password
                    </label>
                    <input
                        type='password'
                        id='password'
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                        className='border rounded-md px-4 py-2 outline-none focus:bg-slate-50 shadow-md'
                    />
                </div>
                <button
                    type='submit'
                    className='px-4 py-2 bg-gray-800 text-white rounded-md mt-4 hover:bg-gray-900'
                >
                    Login as User
                </button>
                {isPending && <p>Loading...</p>}
                {isError && <p>{error?.response.data.error}</p>}
            </form>
            <p className='text-center'>
                No account?{' '}
                <span
                    onClick={() => navigate('/register')}
                    className='text-blue-500 cursor-pointer'
                >
                    Register
                </span>
            </p>
        </>
    );
};

const LoginCaptain = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
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

    const queryClient = useQueryClient();

    const { mutate: loginCaptain } = useMutation({
        mutationFn: async () => {
            const response = await axios.post('/api/captain/login', formData);
            return response.data;
        },
        onSuccess: async (data) => {
            console.log(data);
            toast.success('Logged in successfully');
            await queryClient.invalidateQueries(['captainAuthUser']);
            navigate('/chome');
        },
        onError: (error) => {
            console.log(error);
            toast.error('Failed to login');
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        loginCaptain();
    };

    return (
        <>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <div className='flex flex-col gap-2'>
                    <label htmlFor='email' className='font-medium'>
                        Email
                    </label>
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
                    <label htmlFor='password' className='font-medium'>
                        Password
                    </label>
                    <input
                        type='password'
                        id='password'
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                        className='border rounded-md px-4 py-2 outline-none focus:bg-slate-50 shadow-md'
                    />
                </div>
                <button
                    type='submit'
                    className='px-4 py-2 bg-gray-800 text-white rounded-md mt-4 hover:bg-gray-900'
                    onClick={() => navigate('/home')}
                >
                    Login as Captain
                </button>
            </form>
            <p className='text-center'>
                No account?{' '}
                <span
                    onClick={() => navigate('/register')}
                    className='text-blue-500 cursor-pointer'
                >
                    Register
                </span>
            </p>
        </>
    );
};
