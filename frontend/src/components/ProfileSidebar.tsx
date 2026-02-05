import { useNavigate, useSearchParams } from 'react-router';
import useFetchUsers from '../hooks/useFetchUsers';
import useUserMedia from '../hooks/useUserMedia';
import { useEffect } from 'react';
import { useSocket } from '../context/SocketContext';
import type { RootState } from '../app/store';
import { useDispatch, useSelector } from 'react-redux';
import useLogOut from '../hooks/useLogOut';
import { clearConversation } from '../features/conversationSlice';
import { clearUsers } from '../features/allUsersSlice';
import useGroupMedia from '../hooks/useGroupMedia';
import useFetchGroups from '../hooks/useFetchGroups';
import ProfileSideberTop from './ui/ProfileSideberTop';
import ProfileSideberMedia from './ui/ProfileSideberMedia';
import defaultAvatar from '../assets/default-avater/default-male-avater.png';
import defaultGroupAvatar from '../assets/default-avater/default-group-avater.png';

const ProfileSidebar = () => {
    const { users } = useFetchUsers();
    const { groups } = useFetchGroups();
    const [searchParams] = useSearchParams();
    const selectedUserId = searchParams.get('userid');
    const selectedGroupId = searchParams.get('groupid');
    const selectedUser = users.find((user) => user.id === selectedUserId);
    const selectedGroup = groups.find((group) => group.id === selectedGroupId);
    const socket = useSocket();
    const onlineUsers = useSelector((state: RootState) => state.onlineUsers);

    const { loading, fetchUserMedia, data } = useUserMedia();
    const { loading: gmLoading, fetchGroupMedia, data: gData } = useGroupMedia();

    const { handleLogOut } = useLogOut();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!selectedUserId) return;
        fetchUserMedia(selectedUserId);
    }, [socket, selectedUserId]);

    useEffect(() => {
        if (!selectedGroupId) return;
        fetchGroupMedia(selectedGroupId);
    }, [socket, selectedGroupId]);

    const handleLogoutClick = () => {
        handleLogOut();
        dispatch(clearConversation());
        dispatch(clearUsers());
        navigate('/login');
    };

    return (
        <section className="min-w-80 max-w-80 max-[1460px]:max-w-60 max-[1460px]:min-w-60 max-[1040px]:min-w-50max-[1040px]:max-w-50 max-[767px]:w-full max-[767px]:hidden
         bg-[#8185b2]/10 h-full flex flex-col items-center p-5">
            {/* TOP PART */}
            {selectedUserId && <ProfileSideberTop
                online={selectedUserId && onlineUsers.includes(selectedUserId)}
                avaterImage={selectedUser?.avater || defaultAvatar}
                name={selectedUser?.name || 'No Name Yet'}
                bio={selectedUser?.bio || 'No bio yet'}
            />}
            {selectedGroupId && <ProfileSideberTop
                avaterImage={selectedGroup?.groupsAvater || defaultGroupAvatar}
                name={selectedGroup?.name || 'No Name Yet'}
                bio={selectedGroup?.bio || 'No bio yet'}
            />}

            {/* BOTTOM PART */}
            {selectedUserId  && <ProfileSideberMedia data={data} loading={loading} />}
            {selectedGroupId && <ProfileSideberMedia data={gData} loading={gmLoading} />}

            {/* LOGOUT BUTTON */}
            <button
                onClick={handleLogoutClick}
                className="bg-linear-to-r from-purple-500 via-indigo-500 to-blue-500 w-55 rounded-full py-2 cursor-pointer text-sm absolute bottom-5"
            >
                Logout
            </button>
        </section>
    );
};

export default ProfileSidebar;
