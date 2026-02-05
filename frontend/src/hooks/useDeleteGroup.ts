import axios from 'axios';
import { useState } from 'react';

interface deleteGroupProps {
   groupId: string
}

const serverUrl = import.meta.env.VITE_SERVER_URL;

const useDeletingGroup = () => {
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleDeleteGroup = async ({ groupId }: deleteGroupProps) => {

        try {
            setIsDeleting(true)

            const res = await axios.delete(
                `${serverUrl}/api/group/delete-group/${groupId}`,
                 {withCredentials: true}  );

            if (res.status === 200) { setIsDeleting(false); return true } 

            else {
                setIsDeleting(false);
                setError(res.data.error || 'Failed to delete group. Please try again.');
                return false;
            }
            
        } catch (error: any) {
            setError(error.response.data.error || 'Failed to delete group. Please try again.');
            setIsDeleting(false);
        } finally {
            setIsDeleting(false);
        }
    };

    return { handleDeleteGroup, isDeleting, error };
};

export default useDeletingGroup;
