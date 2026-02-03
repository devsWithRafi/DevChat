import { CiSearch } from 'react-icons/ci';
import logo from '../assets/logo.png';
import useFetchUsers from '../hooks/useFetchUsers';
import { Skeleton } from './ui/skeleton';
import defaultAvater from '../assets/default-avater/default-male-avater.png';
import { Link, useNavigate, useSearchParams } from 'react-router';
import { useEffect, useState } from 'react';
import { BiDotsVertical } from 'react-icons/bi';
import useCurrentUser from '../hooks/useCurrentUser';
import { useSocket } from '../context/SocketContext';
import { cn } from '../lib/utils';
import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';
import useLogOut from '../hooks/useLogOut';
import EditProfileModal from './modals/EditProfileModal';

const Sideber = ({ className }: { className?: string }) => {
    const { users, loading } = useFetchUsers();
    const socket = useSocket();
    const { currentUser } = useCurrentUser();
    const [searchParams] = useSearchParams();
    const selectedUserId = searchParams.get('userid');
    const [searchUser, setSearchUser] = useState<string>('');
    const onlineUsers = useSelector((state: RootState) => state.onlineUsers);
    const { handleLogOut } = useLogOut();
    const navigate = useNavigate();
    const [onEditClick, setOnEditClick] = useState<boolean>(false)

    const filterdUsers = users.filter(user => user.name.toLowerCase().includes(searchUser.toLowerCase()) )

    useEffect(() => {
        if (!currentUser || !selectedUserId) {
            return;
        }

        socket?.emit('join-private-room', {
            senderId: currentUser.id,
            receiverId: selectedUserId,
        });
    }, [socket, currentUser, selectedUserId]);

    const handleLogoutClick = () => {
        handleLogOut();
        navigate('/login');
    };

    return (
        <section
            className={cn(
                'min-w-80 bg-[#8185b2]/10 h-full flex flex-col p-5',
                className,
            )}
        >
            {/* logo */}
            <div className="w-full flex items-center justify-between">
                <img src={logo} alt="" className="w-30" />
                <div className="group relative">
                    <BiDotsVertical className="text-[20px] cursor-pointer" />
                    <div className="absolute scale-0 group-hover:scale-100 duration-300 flex flex-col text-left items-start text-sm border border-white/20 w-35 rounded bg-gray-900 text-nowrap right-0 py-2">
                        <button onClick={() => setOnEditClick(prev => !prev)}
                        className="w-full text-left px-5 py-2 cursor-pointer hover:text-zinc-200">
                            Edit profile
                        </button>

                        {onEditClick && <EditProfileModal setOnEditClick={setOnEditClick}/>}

                        <button
                            onClick={handleLogoutClick}
                            className="w-full text-left px-5 py-2 cursor-pointer border-t border-white/20 hover:text-zinc-200"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
            {/* SEARCHBER */}
            <div className="w-full h-15 mt-3">
                <div className="bg-[#282142]/25 flex gap-1 p-2 px-3 rounded-full border border-[#282142]/55">
                    <CiSearch size={17} />
                    <input
                        type="text"
                        className="border-none outline-0 text-white text-xs placeholder-[#c8c8c8] flex-1 capitalize"
                        placeholder="search user..."
                        onChange={(e) => setSearchUser(e.target.value)}
                    />
                </div>
            </div>
            {/* USERS */}
            <div className="overflow-y-auto overflow-hidden h-[calc(100%-60px)] max-h-[calc(100%-60px)] flex flex-col gap-1">
                {!loading &&
                    Array.isArray(filterdUsers) &&
                    filterdUsers.map((user) => (
                        <Link
                            to={`/?userid=${user.id}`}
                            key={user.id}
                            className={cn(
                                'flex items-center gap-4 py-2 px-5 cursor-pointer rounded-md',
                                selectedUserId === user.id && 'bg-white/10',
                            )}
                        >
                            <div className="w-10 h-10 rounded-full bg-zinc-800 relative">
                                <img
                                    src={user.avater || defaultAvater}
                                    className="w-full rounded-full"
                                />
                                {onlineUsers.includes(user.id) && (
                                    <span className="bg-green-400 w-2.5 h-2.5 border-[2px] border-black rounded-full absolute bottom-1 -right-0.5" />
                                )}
                            </div>
                            <div className="capitalize">
                                <h2 className="font-space font-medium text-md">
                                    {user.name}
                                </h2>
                                <p
                                    className={cn(
                                        'text-xs',
                                        onlineUsers.includes(user.id)
                                            ? 'text-green-400'
                                            : 'text-zinc-400',
                                    )}
                                >
                                    {onlineUsers.includes(user.id)
                                        ? 'Online'
                                        : 'Offline'}
                                </p>
                            </div>
                        </Link>
                    ))}

                {loading &&
                    [...Array(10)].map((_, idx) => (
                        <div
                            key={idx}
                            className="flex items-center gap-4 py-2 w-full cursor-pointer"
                        >
                            <Skeleton className="min-w-12 h-12 rounded-full" />
                            <div className="w-full flex flex-col gap-1">
                                <Skeleton className="w-full h-5 rounded-full" />
                                <Skeleton className="w-[80%] h-5 rounded-full" />
                            </div>
                        </div>
                    ))}
            </div>
        </section>
    );
};

export default Sideber;
