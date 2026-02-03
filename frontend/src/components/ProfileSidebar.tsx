import { useNavigate, useSearchParams } from 'react-router';
import defaultAvatar from '../assets/default-avater/default-male-avater.png';
import useFetchUsers from '../hooks/useFetchUsers';
import useUserMedia from '../hooks/useUserMedia';
import { useEffect, useState } from 'react';
import { useSocket } from '../context/SocketContext';
import { Skeleton } from './ui/skeleton';
import ViewUserMediaModal from './modals/ViewUserMediaModal';
import type { RootState } from '../app/store';
import { useDispatch, useSelector } from 'react-redux';
import useLogOut from '../hooks/useLogOut';
import { clearConversation } from '../features/conversationSlice';
import { clearUsers } from '../features/allUsersSlice';
import { cn } from '../lib/utils';

const ProfileSidebar = () => {
    const { users } = useFetchUsers();
    const [searchParams] = useSearchParams();
    const selectedUserId = searchParams.get('userid');
    const selectedUser = users.find((user) => user.id === selectedUserId);
    const socket = useSocket();
    const [viewMediaClick, setViewMediaClick] = useState<boolean>(false);
    const onlineUsers = useSelector((state: RootState) => state.onlineUsers);
    const { loading, fetchUserMedia, data } = useUserMedia();
    const [avaterLoaded, setAvaterLoaded] = useState<boolean>(false);
    const { handleLogOut } = useLogOut();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!selectedUserId) return;
        fetchUserMedia(selectedUserId);
    }, [socket, selectedUserId]);

    const handleLogoutClick = () => {
        handleLogOut();
        dispatch(clearConversation());
        dispatch(clearUsers());
        navigate('/login');
    };

    return (
        <section className="min-w-80 max-w-80 bg-[#8185b2]/10 h-full flex flex-col items-center p-5">
            {/* TOP PART */}
            <div className="w-full flex flex-col items-center text-center border-b border-white/20 py-5">
                <div className="w-20 rounded-full aspect-square mt-10 relative">
                    <img
                        src={selectedUser?.avater || defaultAvatar}
                        className={cn("w-full rounded-full", avaterLoaded ? "opacity-100" : "opacity-0")}
                        onLoad={() => setAvaterLoaded(true)}
                    />
                    <Skeleton className={cn("w-full aspect-square top-0 rounded-full absolute", 
                        avaterLoaded ? "hidden" : "flex")} 
                    />
                    {selectedUserId && onlineUsers.includes(selectedUserId) && (
                        // online indicator
                        <span className="bg-green-400 w-4 h-4 border-[3px] border-black rounded-full absolute bottom-2 right-0" />
                    )}
                </div>
                <h2 className="font-semibold text-md mt-5">
                    {selectedUser?.name}
                </h2>
                <p className="font-normal text-sm font-space text-zinc-400">
                    {selectedUser?.bio || 'No bio yet'}
                </p>
            </div>
            {/* BOTTOM PART */}
            <div className="w-full py-2 h-full mt-2">
                <h2 className="text-left text-xs">Media</h2>
                <div className={cn("grid grid-cols-2 gap-2", loading ? 'mt-0' : 'mt-5')}>
                    {!loading &&
                        data?.length > 0 &&
                        data.slice(0, 4).map((item) => (
                            <div
                                key={item.id}
                                className="w-full overflow-hidden rounded aspect-[2/1.2]"
                            >
                                <img
                                    src={item.image!}
                                    className="w-full rounded min-h-full object-cover"
                                />
                            </div>
                        ))}
                </div>
                <div className={cn("grid grid-cols-2 gap-2", !loading ? 'mt-0' : 'mt-5')}>
                    {loading &&
                        [...Array(4)].map((_, index) => (
                            <Skeleton
                                key={index}
                                className="w-full overflow-hidden aspect-[2/1.2]"
                            ></Skeleton>
                        ))}
                </div>
                {data?.length > 4 && (
                    <>
                        <button
                            onClick={() => setViewMediaClick((prev) => !prev)}
                            className="text-xs cursor-pointer hover:underline"
                        >
                            Viwe All
                        </button>
                        {viewMediaClick && (
                            <ViewUserMediaModal
                                data={data}
                                onClose={setViewMediaClick}
                            />
                        )}
                    </>
                )}
            </div>
            {/* LOGOUT BUTTON */}
            <button
                onClick={handleLogoutClick}
                className="bg-linear-to-r from-purple-500 via-indigo-500 to-blue-500 w-55 rounded-full py-2 cursor-pointer text-sm"
            >
                Logout
            </button>
        </section>
    );
};

export default ProfileSidebar;
