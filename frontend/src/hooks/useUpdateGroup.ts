import axios from 'axios';
import { useState } from 'react';

interface UpdateGroupProps {
    name: string;
    bio?: string;
    membersIds: string[];
    groupAvaterFile?: File | null;
    groupId: string
}

const serverUrl = import.meta.env.VITE_SERVER_URL;

const useUpdateGroup = () => {
    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleUpdateGroup = async ({
        name,
        bio,
        membersIds,
        groupAvaterFile,
        groupId
    }: UpdateGroupProps) => {
        try {
            setIsUpdating(true);

            const formData = new FormData();
            formData.append('name', name);
            if (bio) formData.append('bio', bio);
            formData.append('membersIds', JSON.stringify(membersIds));
            if (groupAvaterFile) formData.append('groupAvaterFile', groupAvaterFile);

            const res = await axios.put(
                `${serverUrl}/api/group/update-group/${groupId}`, formData,
                { headers: { 'Content-Type': 'multipart/form-data' },
                  withCredentials: true }
            );
            console.log(res.data)

            if (res.status === 200) { setIsUpdating(false); return true } 
            else {
                setIsUpdating(false);
                setError(res.data.error || 'Failed to updata group. Please try again.');
                return false;
            }
        } catch (error: any) {
            setError(error.response.data.error || 'Failed to update group. Please try again.');
            setIsUpdating(false);
        } finally {
            setIsUpdating(false);
        }
    };


    return { handleUpdateGroup, isUpdating, error };
};

export default useUpdateGroup;
