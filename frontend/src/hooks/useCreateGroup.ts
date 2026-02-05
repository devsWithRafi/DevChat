import axios from 'axios';
import { useState } from 'react';

interface CreateGroupProps {
    name: string;
    bio?: string;
    membersIds: string[];
    groupAvaterFile?: File | null;
}

const serverUrl = import.meta.env.VITE_SERVER_URL;

const useCreateGroup = () => {
    const [isCreating, setIsCreating] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const createGroup = async ({
        name,
        bio,
        membersIds,
        groupAvaterFile,
    }: CreateGroupProps) => {
        try {
            setIsCreating(true);

            const formData = new FormData();
            formData.append('name', name);
            if (bio) formData.append('bio', bio);
            formData.append('membersIds', JSON.stringify(membersIds));
            if (groupAvaterFile) formData.append('groupAvaterFile', groupAvaterFile);

            const res = await axios.post(
                `${serverUrl}/api/group/create-new-group`,
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' },
                  withCredentials: true } );

            if (res.status === 200) { setIsCreating(false); return true } 
            else {
                setIsCreating(false);
                setError(res.data.error || 'Failed to create group. Please try again.');
                return false;
            }
        } catch (error: any) {
            setError(error.response.data.error || 'Failed to create group. Please try again.');
            setIsCreating(false);
        } finally {
            setIsCreating(false);
        }
    };


    return { createGroup, isCreating, error };
};

export default useCreateGroup;
