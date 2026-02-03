import axios from 'axios';
import { useState } from 'react';

interface useSignUpProps {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

const serverUrl = import.meta.env.VITE_SERVER_URL;

const useSignUp = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSignUp = async ({ firstName, lastName, email, password }: useSignUpProps) => {
        try {
            setLoading(true);
            const name = `${firstName} ${lastName}`
            const res = await axios.post(
                `${serverUrl}/api/user/signup`,
                { name, email, password },
                { withCredentials: true },
            );

            if (res.status === 200) {
                return true;
            }else{
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
        handleSignUp,
    };
};

export default useSignUp;
