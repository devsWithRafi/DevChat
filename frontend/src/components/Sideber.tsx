import { CiSearch } from 'react-icons/ci';
import logoWhite from '../assets/logo/Devchat-logo-white.png';
import logoBlack from '../assets/logo/Devchat-logo-black.png';
import useFetchUsers from '../hooks/useFetchUsers';
import { useSearchParams } from 'react-router';
import { useEffect, useState } from 'react';
import { useSocket } from '../context/SocketContext';
import { cn } from '../lib/utils';
import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';
import SideberUserItem from './SideberUserItem';
import SideberItemSkeleton from './SideberItemSkeleton';
import useFetchGroups from '../hooks/useFetchGroups';
import SideberGroupItem from './SideberGroupItem';
import { HiMiniPlus } from 'react-icons/hi2';
import CreateGroupModal from './modals/CreateGroupModal';
import { SignOutButton, useUser } from '@clerk/react';
import { RiLogoutBoxRLine } from 'react-icons/ri';

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/@/components/ui/card';
import { ThemeToggle } from '@/@/components/theme/theme-toggle';
import { Button } from '@/@/components/ui/button';

const Sideber = ({ className }: { className?: string }) => {
  const { users, loading } = useFetchUsers();
  const { grpLoading, groups } = useFetchGroups();
  const socket = useSocket();
  const [searchParams] = useSearchParams();
  const selectedUserId = searchParams.get('userid');
  const selectedGroupId = searchParams.get('groupid');
  const [searchUser, setSearchUser] = useState<string>('');
  const [searchGroup, setSearchGroup] = useState<string>('');
  const onlineUsers = useSelector((state: RootState) => state.onlineUsers);
  const [onCreateGroup, setOnCreateGroup] = useState<boolean>(false);
  const [selectedSideberItem, setSelectedSideberItem] =
    useState<string>('peoples');
  const { user } = useUser();

  const filterdUsers = Array.isArray(users)
    ? users.filter((u) =>
        u.name.toLowerCase().includes(searchUser.toLowerCase()),
      )
    : [];
  const filterdGroups = Array.isArray(groups)
    ? groups.filter((g) =>
        g.name.toLowerCase().includes(searchGroup.toLowerCase()),
      )
    : [];

  useEffect(() => {
    if (!user || !selectedUserId) {
      return;
    }
    socket?.emit('join-private-room', {
      senderId: user.id,
      receiverId: selectedUserId,
    });
  }, [socket, user, selectedUserId]);

  return (
    <>
      <section
        className={cn(
          'relative min-w-80 max-w-80 max-[1460px]:max-w-60 max-[1460px]:min-w-60 max-[1040px]:min-w-50 border-r h-full flex flex-col p-5 max-[767px]:min-w-full max-[767px]:max-w-full',
          `max-[767px]:${selectedUserId || selectedGroupId ? 'hidden' : ''}`,
          className,
        )}
      >
        {/* logo */}
        <div className="w-full flex items-center justify-between">
          <img src={logoWhite} alt="" className="w-30 hidden dark:block" />
          <img src={logoBlack} alt="" className="w-30 dark:hidden block" />
          <ThemeToggle />
        </div>
        {/* SEARCHBER */}
        <div className="w-full h-15 mt-3">
          <div className="flex gap-1 p-2 px-3 rounded-full border text-muted-foreground">
            <CiSearch size={17} />
            <input
              type="text"
              placeholder={
                selectedSideberItem === 'peoples'
                  ? 'Search user...'
                  : 'Search group...'
              }
              className="border-none outline-0 text-xs placeholder-muted-foreground flex-1"
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
          <div className="w-full border-b flex items-center mb-2">
            <button
              onClick={() => setSelectedSideberItem('peoples')}
              className={cn(
                'text-xs cursor-pointer text-muted-foreground duration-300 py-0.5 px-1.5 border-b border-transparent',
                selectedSideberItem === 'peoples' &&
                  'text-primary border-b border-primary',
              )}
            >
              Peoples
            </button>
            <button
              onClick={() => setSelectedSideberItem('groups')}
              className={cn(
                'text-xs cursor-pointer border-b border-transparent text-muted-foreground duration-300 py-0.5 px-1.5',
                selectedSideberItem === 'groups' &&
                  'border-primary text-primary',
              )}
            >
              Groups
            </button>
          </div>
          {/* users/groups */}
          {selectedSideberItem === 'peoples' &&
            (!loading ? (
              <>
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
            ) : (
              <SideberItemSkeleton />
            ))}

          {/* groups */}
          {selectedSideberItem === 'groups' &&
            (!grpLoading ? (
              <>
                {filterdGroups.map((group) => (
                  <SideberGroupItem
                    key={group.id}
                    group={group}
                    selectedGroupId={selectedGroupId}
                  />
                ))}
                <>
                  <Button
                    onClick={() => setOnCreateGroup((prev) => !prev)}
                    className="h-auto p-2"
                  >
                    Create group
                    <HiMiniPlus className="inline mr-1" size={20} />
                  </Button>
                </>
              </>
            ) : (
              <SideberItemSkeleton />
            ))}
        </div>

        {/* current user */}
        <div>
          {user && (
            <Card className="rounded p-2.5 cursor-pointer">
              <CardContent className="flex items-center justify-between gap-2 p-0">
                <div className="flex items-center gap-2">
                  <div className="size-8 rounded-full overflow-hidden border">
                    <img
                      src={user.imageUrl}
                      alt={user.fullName || ''}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <CardTitle className="text-sm">{user.fullName}</CardTitle>
                    <CardDescription className="text-xs">
                      {user?.primaryEmailAddress?.emailAddress}
                    </CardDescription>
                  </div>
                </div>
                <SignOutButton>
                  <CardDescription className="hover:text-red-300">
                    <RiLogoutBoxRLine size={18} />
                  </CardDescription>
                </SignOutButton>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
      {onCreateGroup && (
        <CreateGroupModal onClose={setOnCreateGroup} />
      )}
    </>
  );
};

export default Sideber;
