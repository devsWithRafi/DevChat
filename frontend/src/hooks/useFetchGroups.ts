import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../app/store';
import { groupFetchError, groupFetchStart, groupFetchSuccess } from '../features/groupSlice';

const serverUrl = import.meta.env.VITE_SERVER_URL;

const useFetchGroups = () => {
    const dispatch = useDispatch()
    const {groups, grpLoading, error} = useSelector((state: RootState) => state.groups)

    const fetchGroups = async () => {
        try {
            dispatch(groupFetchStart())
            const res = await axios.get(`${serverUrl}/api/group/get-groups`,
                {withCredentials: true}
            );

            if (res.status === 200) {
                dispatch(groupFetchSuccess(res.data));
                return true;
            } else {
               dispatch(groupFetchError(res.data.error || 'Failed to fetch groups!'))
               return false;
            }
        } catch (error: any) {
            dispatch(groupFetchError(error.response.data.error || 'Failed to fetch groups!'));
        }
    };

    useEffect(() => {
        const shouldFetch = !groups || groups.length < 1;
        if(shouldFetch) fetchGroups();
    }, [])

    return { groups, grpLoading, error, fetchGroups };
};

export default useFetchGroups;
