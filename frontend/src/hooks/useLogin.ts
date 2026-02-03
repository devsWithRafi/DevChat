import axios from 'axios';
import { useState } from 'react';

interface useLoginProps {
    email: string;
    password: string;
}

const serverUrl = import.meta.env.VITE_SERVER_URL;

const useLogin = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async ({ email, password }: useLoginProps) => {
        try {
            setLoading(true);
            const res = await axios.post(
                `${serverUrl}/api/user/signin`,
                { email, password },
                { withCredentials: true },
            );

            if (res.status === 200) {
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
        handleLogin,
    };
};

export default useLogin;
