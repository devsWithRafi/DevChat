import axios from 'axios';
import { useState } from 'react';
import { useSearchParams } from 'react-router';

interface useSendMessageProps {
    imageFile: File | null;
    textMsg: string | null;
}
const serverUrl = import.meta.env.VITE_SERVER_URL;

const useSendGroupMessage = () => {
    const [isSending, setIsSending] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [searchParams] = useSearchParams()
    const groupId = searchParams.get("groupid")

    const handleSendGroupMessage = async ({ imageFile, textMsg }: useSendMessageProps) => {
        const formData = new FormData();
        if (imageFile) formData.append('imageFile', imageFile);
        if (textMsg) formData.append('text', textMsg);

        try {
            setIsSending(true);
            const res = await axios.post(
                `${serverUrl}/api/group/send-group-message/${groupId}`, formData,
                { withCredentials: true },
            );

            if (res.status === 200) {
                return true;
            } else {
                setIsSending(false);
                return false;
            }
        } catch (error: any) {
            setError(error.response.data.error || 'An error occurred while sending the group message.');
            setIsSending(false);
        } finally {
            setIsSending(false);
        }
    };

    return {
        isSending,
        error,
        handleSendGroupMessage,
    };
};

export default useSendGroupMessage;
