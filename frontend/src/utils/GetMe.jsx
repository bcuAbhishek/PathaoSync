import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useAuthUser = () => {
    const {
        data: authUser,
        isLoading,
        error,
        isError,
    } = useQuery({
        queryKey: ['authUser'],
        queryFn: async () => {
            const { data } = await axios.get('/api/auth/me');
            return data;
        },
        staleTime: 5 * 60 * 1000,
    });

    return { authUser, isLoading, error, isError };
};

export const useCaptainAuthUser = () => {
    const {
        data: captainAuthUser,
        isLoading,
        error,
        isError,
    } = useQuery({
        queryKey: ['captainAuthUser'],
        queryFn: async () => {
            const { data } = await axios.get('/api/captain/getCaptain');
            return data;
        },
        staleTime: 5 * 60 * 1000,
    });

    return { captainAuthUser, isLoading, error, isError };
};
