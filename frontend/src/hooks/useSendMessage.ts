import axios from 'axios';
import { useState } from 'react';
import { useSearchParams } from 'react-router';

interface useSendMessageProps {
    imageFile: File | null;
    textMsg: string | null;
}
const serverUrl = import.meta.env.VITE_SERVER_URL;

const useSendMessage = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [searchParams] = useSearchParams()
    const userId = searchParams.get("userid")

    const handleSendMessage = async ({ imageFile, textMsg }: useSendMessageProps) => {
        const formData = new FormData();
        if (imageFile) formData.append('image', imageFile);
        if (textMsg) formData.append('text', textMsg);

        try {
            setLoading(true);
            const res = await axios.post(
                `${serverUrl}/api/message/send/${userId}`, formData,
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
        handleSendMessage,
    };
};

export default useSendMessage;
