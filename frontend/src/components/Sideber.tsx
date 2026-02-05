import { CiSearch } from 'react-icons/ci';
import logo from '../assets/logo.png';
import useFetchUsers from '../hooks/useFetchUsers';
import { useNavigate, useSearchParams } from 'react-router';
import { useEffect, useState } from 'react';
import useCurrentUser from '../hooks/useCurrentUser';
import { useSocket } from '../context/SocketContext';
import { cn } from '../lib/utils';
import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';
import useLogOut from '../hooks/useLogOut';
import EditProfileModal from './modals/EditProfileModal';
import SideberUserItem from './SideberUserItem';
import SideberItemSkeleton from './SideberItemSkeleton';
import useFetchGroups from '../hooks/useFetchGroups';
import SideberGroupItem from './SideberGroupItem';
import { HiMiniPlus } from 'react-icons/hi2';
import CreateGroupModal from './modals/CreateGroupModal';
import { BiMenuAltRight } from "react-icons/bi";

const Sideber = ({ className }: { className?: string }) => {
    const { users, loading } = useFetchUsers();
    const { grpLoading, groups } = useFetchGroups();
    const socket = useSocket();
    const { currentUser } = useCurrentUser();
    const [searchParams] = useSearchParams();
    const selectedUserId = searchParams.get('userid');
    const selectedGroupId = searchParams.get('groupid');
    const [searchUser, setSearchUser] = useState<string>('');
    const [searchGroup, setSearchGroup] = useState<string>('');
    const onlineUsers = useSelector((state: RootState) => state.onlineUsers);
    const { handleLogOut } = useLogOut();
    const navigate = useNavigate();
    const [onEditClick, setOnEditClick] = useState<boolean>(false);
    const [onMenuBtnClick, setOnMenuBtnClick] = useState<boolean>(false);
    const [onCreateGroup, setOnCreateGroup] = useState<boolean>(false);
    const [selectedSideberItem, setSelectedSideberItem] =
        useState<string>('peoples');

    const filterdUsers = users.filter((u) => u.name.toLowerCase().includes(searchUser.toLowerCase()));
    const filterdGroups = groups.filter((g) => g.name.toLowerCase().includes(searchGroup.toLowerCase()));

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
                'min-w-80 max-w-80 max-[1460px]:max-w-60 max-[1460px]:min-w-60 max-[1040px]:min-w-50 bg-[#8185b2]/10 h-full flex flex-col p-5 max-[767px]:min-w-full max-[767px]:max-w-full',
                `max-[767px]:${(selectedUserId || selectedGroupId) ? 'hidden' : ''}`,
                className,
            )}
        >
            {/* logo */}
            <div className="w-full flex items-center justify-between">
                <img src={logo} alt="" className="w-30" />
                <div className="group relative">
                    <BiMenuAltRight size={25} onClick={() => setOnMenuBtnClick(prev => !prev)}
                    className="text-[20px] cursor-pointer" />
                    <div onClick={() => setOnMenuBtnClick(prev => !prev)}
                    className={cn("absolute scale-0 group-hover:scale-100 duration-300 flex flex-col text-left items-start text-sm border border-white/20 w-35 rounded bg-gray-900 text-nowrap right-0 py-2",
                        onMenuBtnClick && 'scale-100'
                    )}>
                        <button
                            onClick={() => setOnEditClick((prev) => !prev)}
                            className="w-full text-left px-5 py-2 cursor-pointer hover:text-zinc-200"
                        >
                            Edit profile
                        </button>

                        {onEditClick && (
                            <EditProfileModal setOnEditClick={setOnEditClick} />
                        )}

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
                        placeholder={selectedSideberItem === 'peoples'? 'Search user...' : 'Search group...'}
                        className="border-none outline-0 text-white text-xs placeholder-[#c8c8c8] flex-1 capitalize"
                        onChange={(e) => 
                            selectedSideberItem === 'peoples' 
                            ? setSearchUser(e.target.value)
                            : setSearchGroup(e.target.value)
                        }
                    />
                </div>
            </div>
            {/* USERS */}
            <div className="overflow-y-auto overflow-hidden h-[calc(100%-60px)] max-h-[calc(100%-60px)] flex flex-col gap-1">
                {/* swichber */}
                <div className="w-full border-b border-white/20 flex items-center mb-2">
                    <button
                        onClick={() => setSelectedSideberItem('peoples')}
                        className={cn(
                            'text-xs cursor-pointer border-b border-transparent text-zinc-400 hover:text-white duration-300 py-0.5 px-1.5',
                            selectedSideberItem === 'peoples' &&
                                'border-white text-white',
                        )}
                    >
                        Peoples
                    </button>
                    <button
                        onClick={() => setSelectedSideberItem('groups')}
                        className={cn(
                            'text-xs cursor-pointer border-b border-transparent text-zinc-400 hover:text-white duration-300 py-0.5 px-1.5',
                            selectedSideberItem === 'groups' &&
                                'border-white text-white',
                        )}
                    >
                        Groups
                    </button>
                </div>
                {/* users/groups */}
                {selectedSideberItem === 'peoples' && (
                    !loading ? <>
                        {Array.isArray(filterdUsers) &&
                            filterdUsers.map((user) => (
                                <SideberUserItem
                                    key={user.id}
                                    user={user}
                                    selectedUserId={selectedUserId}
                                    onlineUsers={onlineUsers}
                                />
                        ))}
                    </>
                    : <SideberItemSkeleton />
                )}

                {/* groups */}
                {selectedSideberItem === 'groups' && (
                    !grpLoading ? <>
                        {filterdGroups.map((group) => (
                            <SideberGroupItem
                                key={group.id}
                                group={group}
                                selectedGroupId={selectedGroupId}
                            />
                        ))}
                        <>         
                            <button 
                            onClick={() => setOnCreateGroup(prev => !prev)}
                            className="bg-white/10 cursor-pointer w-full rounded-full p-2 text-sm flex items-center justify-center gap-1 mt-5 border border-white/10 hover:bg-white/20 duration-300">
                                Create group
                                <HiMiniPlus className="inline mr-1" size={20} />
                            </button>
                            {onCreateGroup && <CreateGroupModal onClose={setOnCreateGroup}/>}
                        </>
                    </>
                    : <SideberItemSkeleton />
                )}
            </div>
        </section>
    );
};

export default Sideber;
