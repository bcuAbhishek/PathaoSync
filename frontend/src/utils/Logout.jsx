import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import { LuLogOut } from 'react-icons/lu';

const Logout = () => {
    const { mutate: logout } = useMutation({
        mutationFn: async () => {
            try {
                const response = await axios.post('/api/auth/logout');
                return response.data;
            } catch (error) {
                throw new Error(error.response.data.message);
            }
        },
        onSuccess: async () => {
            toast.success('Logged out successfully');

            window.location.reload();
        },
        onError: (error) => {
            console.error(error);
            toast.error('Failed to logout');
        },
    });

    const handleLogout = () => {
        logout();
    };

    return (
        <div className='flex justify-center items-center h-full'>
            <button
                className='text-red-500 font-bold py-2 px-4 rounded flex items-center'
                onClick={handleLogout}
            >
                <LuLogOut className='text-red-500 mr-2' />
                
            </button>
        </div>
    );
};

export default Logout;
