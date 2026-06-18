import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../app/store';
import { useSearchParams } from 'react-router';
import {
  fetchConversationError,
  fetchConversationStart,
  fetchConversationSuccess,
} from '../features/conversationSlice';
import { getToken } from '@clerk/react';

const serverUrl = import.meta.env.VITE_SERVER_URL;

const useConversations = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { conversations, loading, error } = useSelector(
    (state: RootState) => state.conversations,
  );

  const [searchParams] = useSearchParams();
  const userId = searchParams.get('userid');

  const fetchConversation = async () => {
    const token = await getToken();

    dispatch(fetchConversationStart());
    try {
      const res = await axios.get(
        `${serverUrl}/api/message/conversation/${userId}`,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (res.data.success) {
        dispatch(fetchConversationSuccess(res.data));
      } else {
        throw new Error(res.data.message || 'Failed to fetch conversations!');
      }
    } catch (error: any) {
      dispatch(fetchConversationError(error.message));
    }
  };

  useEffect(() => {
    fetchConversation();
  }, [userId]);

  return { conversations, loading, error, fetchConversation };
};

export default useConversations;
