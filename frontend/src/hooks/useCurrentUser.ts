import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {
  currUserFetchError,
  currUserFetchStart,
  currUserFetchSuccess,
} from '../features/currentUserSlice';
import { getToken } from '@clerk/react';

const serverUrl = import.meta.env.VITE_SERVER_URL;

const useCurrentUser = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: any) => state.currentUser);

  useEffect(() => {
    const fetchUser = async () => {
      dispatch(currUserFetchStart());
      try {
        const token = await getToken();
        const res = await axios.get(`${serverUrl}/api/user/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status === 200) {
          dispatch(currUserFetchSuccess(res.data));
        } else {
          throw new Error(res.data.error || 'Failed to fetch current user!');
        }
      } catch (error: any) {
        console.log(error);
        dispatch(currUserFetchError(error.response.data.error));
      }
    };
    fetchUser();
  }, [dispatch]);

  return currentUser;
};

export default useCurrentUser;
