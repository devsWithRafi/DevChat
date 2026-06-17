import { useState } from 'react';
import { cn } from '../lib/utils';
import { useNavigate, useSearchParams } from 'react-router';
import useFetchUsers from '../hooks/useFetchUsers';
import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';
import useFetchGroups from '../hooks/useFetchGroups';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import defaultAvater from '../assets/default-avater/default-male-avater.png';
import defaultGroupAvater from '../assets/default-avater/default-group-avater.png';
import useRemoveMemberFromGroup from '../hooks/useRemoveMember';
import toast from 'react-hot-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/@/components/ui/dropdown-menu';
import { Button } from '@/@/components/ui/button';
import { GrSettingsOption } from 'react-icons/gr';
import { useUser } from '@clerk/react';
import UpdateGroupModal from './modals/UpdateGroupModal';

interface NavberProps {
  navType: 'chat' | 'group';
}

const Navber = ({ navType = 'chat' }: NavberProps) => {
  const [avaterLoaded, setAvaterLoaded] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const userId = searchParams.get('userid');
  const groupId = searchParams.get('groupid');
  const { users } = useFetchUsers();
  const { groups, fetchGroups } = useFetchGroups();
  const { error: grpLeaveError, handleRemoveMember } =
    useRemoveMemberFromGroup();
  const { user } = useUser();
  const [editGroup, setEditGroup] = useState(false);

  const findUser = users.find((user) => user.id === userId);
  const findGroup = groups.find((g) => g.id === groupId);
  const onlineUsers = useSelector((state: RootState) => state.onlineUsers);
  const isCurrentUserInThisGroup = findGroup?.members.find(
    (m) => m.id === user?.id,
  );

  const handleRemoveFromGroup = async () => {
    const success = await handleRemoveMember(groupId!);
    if (success) {
      fetchGroups();
      toast.success('Leaving from group success!');
      return;
    } else {
      toast.error(grpLeaveError || 'Leaving from group failed!');
      return;
    }
  };

  return (
    <>
      <header className="w-full min-h-15 max-h-15 max-[767px]:h-10 flex gap-2 items-center border-b relative">
        <div className="flex gap-2 items-center px-4">
          <div
            className={cn(
              'w-10 h-10 max-[767px]:w-7 max-[767px]:h-7 capitalize relative',
            )}
          >
            <img
              src={
                navType === 'chat'
                  ? findUser?.avatar || defaultAvater
                  : findGroup?.groupsAvater || defaultGroupAvater
              }
              className={cn(
                'w-full h-full duration-200 opacity-0 object-cover aspect-square',
                avaterLoaded && 'opacity-100',
                navType === 'chat' ? 'rounded-full' : 'rounded-md',
                navType === 'chat'
                  ? findUser && onlineUsers.includes(findUser.id)
                    ? 'border-2 border-green-400 p-0.5'
                    : 'border-2 border-muted p-0.5'
                  : 'border-0',
              )}
              onLoad={() => setAvaterLoaded(true)}
            />
          </div>
          <div className="font-medium text-lg max-[767px]:text-sm relative items-center flex ">
            <span className="flex flex-col">
              <h2>{navType === 'chat' ? findUser?.name : findGroup?.name}</h2>
              {navType === 'group' ? (
                <p className="text-xs max-[767px]:text-[10px] font-normal -mt-1 text-muted-foreground">
                  Members {findGroup?.members.length}
                </p>
              ) : (
                <p className="text-xs max-[767px]:text-[10px] font-normal -mt-1 text-muted-foreground">
                  {findUser?.email}
                </p>
              )}
            </span>
          </div>
          <div className="absolute right-3 flex items-center gap-5">
            {isCurrentUserInThisGroup && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="aspect-square text-muted-foreground"
                  >
                    <GrSettingsOption />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuGroup>
                    {findGroup?.admin.id === user?.id && (
                      <DropdownMenuItem
                        onClick={() => setEditGroup((prev) => !prev)}
                      >
                        Edit Group
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={handleRemoveFromGroup}>
                      Leave Group
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            <button
              onClick={() => navigate('/')}
              className="hidden max-[767px]:flex cursor-pointer text-[20px]"
            >
              <MdOutlineArrowBackIosNew />
            </button>
          </div>
        </div>
      </header>
      {findGroup && editGroup && (
        <UpdateGroupModal onClose={setEditGroup} group={findGroup} />
      )}
    </>
  );
};

export default Navber;
