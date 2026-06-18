import { getToken } from '@clerk/react';
import axios from 'axios';
import { useState } from 'react';

const serverUrl = import.meta.env.VITE_SERVER_URL;

const useAddNewMemberIntoGroup = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddNewMember = async (groupId: string) => {
    try {
      setLoading(true);
      setError(null);
      const token = await getToken();

      const res = await axios.put(
        `${serverUrl}/api/group/add-new-member/${groupId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (res.data.success) {
        return true;
      } else {
        setLoading(false);
        return false;
      }
    } catch (error: any) {
      setError(error.response.data.error || 'An error occoured!');
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    handleAddNewMember,
  };
};

export default useAddNewMemberIntoGroup;
