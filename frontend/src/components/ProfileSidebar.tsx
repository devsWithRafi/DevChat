import { useSearchParams } from 'react-router';
import useFetchUsers from '../hooks/useFetchUsers';
import useUserMedia from '../hooks/useUserMedia';
import { useEffect } from 'react';
import { useSocket } from '../context/SocketContext';
import type { RootState } from '../app/store';
import { useSelector } from 'react-redux';
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

  useEffect(() => {
    if (!selectedUserId) return;
    fetchUserMedia(selectedUserId);
  }, [socket, selectedUserId]);

  useEffect(() => {
    if (!selectedGroupId) return;
    fetchGroupMedia(selectedGroupId);
  }, [socket, selectedGroupId]);

  return (
    <section className="min-w-80 max-w-80 max-[1460px]:max-w-60 max-[1460px]:min-w-60 max-[1040px]:min-w-50max-[1040px]:max-w-50 max-[767px]:w-full max-[767px]:hidden h-full flex flex-col items-center p-5 border-l">
      {/* TOP PART */}
      {selectedUserId && (
        <ProfileSideberTop
          online={selectedUserId && onlineUsers.includes(selectedUserId)}
          avaterImage={selectedUser?.avatar || defaultAvatar}
          name={selectedUser?.name || 'Anonymous'}
          bio={selectedUser?.email || ''}
        />
      )}
      {selectedGroupId && (
        <ProfileSideberTop
          type="group"
          avaterImage={selectedGroup?.groupsAvater || defaultGroupAvatar}
          name={selectedGroup?.name || 'No Name Yet'}
          bio={selectedGroup?.bio || 'No bio yet'}
        />
      )}

      {/* BOTTOM PART */}
      {selectedUserId && <ProfileSideberMedia data={data} loading={loading} />}
      {selectedGroupId && (
        <ProfileSideberMedia data={gData} loading={gmLoading} />
      )}

      {/* LOGOUT BUTTON */}
      {/* <Button variant={'outline'} className="w-full">
        View Profile
      </Button> */}
    </section>
  );
};

export default ProfileSidebar;
