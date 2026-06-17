import { getToken } from '@clerk/react';
import axios from 'axios';
import { useState } from 'react';

const serverUrl = import.meta.env.VITE_SERVER_URL;

const useRemoveMemberFromGroup = () => {
  const [error, setError] = useState<string | null>(null);

  const handleRemoveMember = async (groupId: string) => {
    try {
      setError(null);
      const token = await getToken();

      const res = await axios.put(
        `${serverUrl}/api/group/remove-member/${groupId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (res.status === 200) return true;
      else return false;
    } catch (error: any) {
      setError(error.response.data.error || 'An error occoured!');
    }
  };

  return {
    error,
    handleRemoveMember,
  };
};

export default useRemoveMemberFromGroup;
