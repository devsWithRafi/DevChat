import axios from 'axios';

const serverUrl = import.meta.env.VITE_SERVER_URL;

const useLogOut = () => {
    const handleLogOut = async () => {
        try {
            const res = await axios.get(`${serverUrl}/api/user/logout`, {
                withCredentials: true,
            });

            if (res.status === 200) return true;
            else return false;

        } catch (error: any) {
            throw new Error(error.response.data.error || "Logout failed!");
        }
    };

    return {
        handleLogOut,
    };
};

export default useLogOut;
