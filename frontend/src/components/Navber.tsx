import { useState } from 'react';
import { cn } from '../lib/utils';
import { useNavigate, useSearchParams } from 'react-router';
import useFetchUsers from '../hooks/useFetchUsers';
import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';
import useFetchGroups from '../hooks/useFetchGroups';
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { RiLogoutCircleLine } from "react-icons/ri";
import useCurrentUser from '../hooks/useCurrentUser';
import defaultAvater from '../assets/default-avater/default-male-avater.png';
import defaultGroupAvater from '../assets/default-avater/default-group-avater.png'
import useRemoveMemberFromGroup from '../hooks/useRemoveMember';
import toast from 'react-hot-toast';


interface NavberProps {
    navType: 'chat' | 'group';
}

const Navber = ({ navType="chat" }: NavberProps) => {
    const [avaterLoaded, setAvaterLoaded] = useState<boolean>(false);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate()
    const userId = searchParams.get('userid');
    const groupId = searchParams.get('groupid');
    const { users } = useFetchUsers();
    const { groups, fetchGroups } = useFetchGroups()
    const {currentUser} = useCurrentUser()
    const {error:grpLeaveError, handleRemoveMember} = useRemoveMemberFromGroup()

    const findUser = users.find((user) => user.id === userId);
    const findGroup = groups.find(g => g.id === groupId);
    const onlineUsers = useSelector((state: RootState) => state.onlineUsers);
    const isCurrentUserInThisGroup = findGroup?.members.find(m => m.id === currentUser?.id)


     const handleJoinGroup = async () => {
        const success = await handleRemoveMember(groupId!);
        if (success) {
            fetchGroups()
            toast.success('Leaving from group success!');
            return;
        } else {
            toast.error(grpLeaveError || 'Leaving from group failed!');
            return;
        }
    };


    return (
        <header className="w-full h-15 max-[767px]:h-10 max-[767px]:pb-1 flex gap-2 items-center border-b border-white/20 relative">
            <div className="w-10 h-10 max-[767px]:w-7 max-[767px]:h-7 rounded-full bg-zinc-800 capitalize overflow-hidden">
                <img
                    src={(navType=== "chat" 
                        ? findUser?.avater  || defaultAvater 
                        : findGroup?.groupsAvater || defaultGroupAvater
                    )}
                    className={cn(
                        'w-full h-full duration-200 opacity-0',
                        avaterLoaded && 'opacity-100',
                    )}
                    onLoad={() => setAvaterLoaded(true)}
                />
            </div>
            <div className="font-medium text-lg max-[767px]:text-sm relative items-center flex ">
                <span className='flex flex-col'>
                    <h2>{navType === "chat" ? findUser?.name : findGroup?.name}</h2>
                    {navType === "group" && <p className='text-xs max-[767px]:text-[10px] font-normal -mt-1 text-zinc-400'>
                        Members {findGroup?.members.length}
                    </p>}
                </span>
                {navType === "chat" && 
                findUser && onlineUsers.includes(findUser.id) && 
                    <div className="flex items-center justify-center absolute -right-5">
                        <span className="bg-green-400 w-2 h-2 max-[767px]:h-1.5 max-[767px]:w-1.5 rounded-full absolute" />
                        <span className="bg-green-400/50 w-3 h-3 rounded-full absolute animate-ping" />
                    </div>}
            </div>
            <div className='absolute right-0 flex items-center gap-5'>
                {isCurrentUserInThisGroup && 
                <button onClick={handleJoinGroup} className='text-xs flex items-center cursor-pointer gap-1 bg-white/10 px-2 py-1 rounded hover:bg-red-500 duration-300'>
                    <RiLogoutCircleLine/>
                    Leave
                </button>}
                <button onClick={() => navigate('/')}
                className='hidden max-[767px]:flex cursor-pointer text-[20px]'>
                    <MdOutlineArrowBackIosNew/>
                </button>
            </div>
        </header>
    );
};

export default Navber;
