import axios from 'axios';
import { useState } from 'react';
import type { MessageType } from '../types/Types';
import { getToken } from '@clerk/react';

const serverUrl = import.meta.env.VITE_SERVER_URL;

const useGroupMedia = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<MessageType[]>([]);

  const fetchGroupMedia = async (groupId: string) => {
    try {
      setLoading(true);
      setError(null);
      setData([]);
      const token = await getToken();

      const res = await axios.get(
        `${serverUrl}/api/group/get-groups-media/${groupId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (res.status === 200) {
        setData(res.data.messages || []);
        return true;
      } else {
        setLoading(false);
        return false;
      }
    } catch (error: any) {
      setError(error.response.data.error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    data,
    fetchGroupMedia,
  };
};

export default useGroupMedia;
