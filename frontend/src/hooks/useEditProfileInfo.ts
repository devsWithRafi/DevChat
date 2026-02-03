import axios from 'axios';
import { useState } from 'react';

interface EditProfileInfoProps {
    name: string;
    bio: string;
    avaterFile: File | null;
}

const serverUrl = import.meta.env.VITE_SERVER_URL;

const useEditProfileInfo = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleEditProfileInfo = async ({ name, bio, avaterFile }: EditProfileInfoProps) => {
        try {
            setLoading(true);
            setError(null);

            const formData = new FormData();
            formData.append('name', name);
            formData.append('bio', bio);
            if (avaterFile) formData.append('avaterFile', avaterFile);

            const res = await axios.put(`${serverUrl}/api/user/edit-profile`, formData, 
                  { withCredentials: true }
            );

            if (res.status === 200) { setLoading(false); return true } 
            else { return false }
        } catch (error: any) {
            setError(error.response.data.error || 'An error occurred - Profile not updated');
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        handleEditProfileInfo,
    };
};

export default useEditProfileInfo;
