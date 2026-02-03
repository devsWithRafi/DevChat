import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../app/store';
import {
    usersFetchError,
    usersFetchStart,
    usersFetchSuccess,
} from '../features/allUsersSlice';

const serverUrl = import.meta.env.VITE_SERVER_URL;

const useFetchUsers = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { users, loading, error } = useSelector(
        (state: RootState) => state.allUsers,
    );

    const fetchUsers = async () => {
        dispatch(usersFetchStart());
        try {
            const res = await axios.get(`${serverUrl}/api/user/get-all-users`, {
                withCredentials: true,
            });

            if (res.status === 200) {
                dispatch(usersFetchSuccess(res.data));
            } else {
                throw new Error(res.data.error || 'Failed to fetch users!');
            }
        } catch (error: any) {
            dispatch(usersFetchError(error.response.data.error));
        }
    };

    useEffect(() => {
        const shouldFetch = !users || users.length < 1;
        if(shouldFetch) fetchUsers();
    }, [dispatch]);

    return { users, loading, error, fetchUsers };
};

export default useFetchUsers;
