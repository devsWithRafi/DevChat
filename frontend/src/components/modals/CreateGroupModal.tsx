import { useState, type Dispatch, type SetStateAction } from 'react';
import Portal from '../Portal';
import useFetchUsers from '../../hooks/useFetchUsers';
import defaultGroupAvater from '../../assets/default-avater/default-group-avater.png';
import defaultUserAvater from '../../assets/default-avater/default-male-avater.png';
import { CiSearch } from 'react-icons/ci';
import { FiPlus } from 'react-icons/fi';
import { MdOutlineCheck } from 'react-icons/md';
import { cn } from '../../lib/utils';
import { LuCamera } from 'react-icons/lu';
import useCreateGroup from '../../hooks/useCreateGroup';
import Spinner from '../ui/Spinner';
import { Button, buttonVariants } from '@/@/components/ui/button';
import { toast } from 'sonner';
import useFetchGroups from '@/hooks/useFetchGroups';

interface CreateGroupModalProps {
  onClose: Dispatch<SetStateAction<boolean>>;
}

const CreateGroupModal = ({ onClose }: CreateGroupModalProps) => {
  const { users } = useFetchUsers();
  const [selectedUsrsId, setSelectedUsersId] = useState<string[]>([]);
  const [searchInput, setSearchInput] = useState<string>('');
  const [groupInput, setGroupInput] = useState({ name: '', bio: '' });
  const [avaterFile, setAvaterFile] = useState<File | null>(null);

  const { createGroup, isCreating, error } = useCreateGroup();

  const totalMembers = selectedUsrsId.length;
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchInput.toLowerCase()),
  );

  const { fetchGroups } = useFetchGroups();

  const addUserToGroup = (userId: string) => {
    const isUserAlreadyAdded = selectedUsrsId.includes(userId);
    if (isUserAlreadyAdded) {
      setSelectedUsersId((prev) => prev.filter((id) => id !== userId));
    } else {
      setSelectedUsersId((prev) => [...prev, userId]);
    }
  };

  const handleCreateGroup = async () => {
    if (selectedUsrsId.length < 2) {
      return toast.error('Add at least 2 members to create a group');
    }
    if (!groupInput.name.trim()) {
      return toast.error('Group name is required');
    }
    const success = await createGroup({
      name: groupInput.name,
      bio: groupInput.bio,
      groupAvaterFile: avaterFile,
      membersIds: selectedUsrsId,
    });

    if (success) {
      setGroupInput({ name: '', bio: '' });
      setAvaterFile(null);
      setSelectedUsersId([]);
      onClose(false);
      fetchGroups();
      return toast.success('Group created successfully');
    }
    return toast.error(error || 'Failed to create group');
  };

  return (
    <Portal onClose={onClose}>
      <section className="w-200 h-[90vh] relative bg-background rounded-xl overflow-hidden p-8 max-[888px]:w-150 max-[615px]:w-100 max-[430px]:w-[95vw] border">
        {/* TOP */}
        <div className="flex w-full gap-5 items-center max-[615px]:flex-col max-[615px]:gap-0">
          <div className="min-w-40 max-w-40 aspect-square rounded-full overflow-hidden mb-5 max-[615px]:mb-0 relative cursor-pointer max-[888px]:min-w-30 max-[888px]:w-30 max-[615px]:w-25 max-[615px]:min-w-25">
            <img
              src={
                avaterFile
                  ? URL.createObjectURL(avaterFile)
                  : defaultGroupAvater
              }
              className="w-full"
            />
            <label
              htmlFor="avaterFile"
              className="absolute w-full h-full top-0 left-0 bottom-0 right-0 bg-black/40 rounded-full flex items-center justify-center cursor-pointer"
            >
              <LuCamera className="text-white text-[34px] max-[615px]:text-[25px]" />
            </label>
            <input
              type="file"
              id="avaterFile"
              accept="image/*"
              className="hidden"
              onChange={(e) =>
                setAvaterFile(e.target.files && e.target.files[0])
              }
            />
          </div>
          <div className="w-full flex flex-col gap-5 max-[615px]:gap-2 text-muted-foreground">
            <input
              type="text"
              placeholder="Group Name"
              onChange={(e) =>
                setGroupInput((prev) => ({ ...prev, name: e.target.value }))
              }
              className="border-b px-3 py-2 outline-0 max-[888px]:text-xs"
            />
            <input
              type="text"
              placeholder="Group Description (optional)"
              onChange={(e) =>
                setGroupInput((prev) => ({ ...prev, bio: e.target.value }))
              }
              className="border-b px-3 py-2 outline-0 max-[888px]:text-xs"
            />
            <h2 className="text-muted-foregroundtext-sm max-[888px]:text-xs font-medium">
              Total members: {totalMembers}
            </h2>
          </div>
        </div>
        {/* BOTTOM */}
        <div className="w-full h-full flex mt-5 flex-col gap-3 overflow-y-auto">
          <div className="w-full py-2 flex items-center gap-2 border-b text-muted-foreground">
            <CiSearch className="text-zinc-400 text-[20px]" />
            <input
              type="text"
              placeholder="Search for users to add"
              className="w-full border-0 outline-0 max-[888px]:text-xs"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
          {/* users */}
          <div className="w-full overflow-y-auto h-[calc(100%-50%)] overflow-hidden flex flex-col pb-10">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center gap-3 justify-between py-2 cursor-pointer hover:bg-muted px-5 rounded max-[615px]:px-0"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={user.avatar || defaultUserAvater}
                    className="w-13 max-[888px]:w-10 rounded-full aspect-square"
                  />
                  <div>
                    <h2 className="font-medium text-lg max-[888px]:text-sm text-primary">
                      {user.name}
                    </h2>
                    <p className="text-sm text-zinc-400 font-normal max-[888px]:text-xs">
                      {user.email || ''}
                    </p>
                  </div>
                </div>
                <button type="button" onClick={() => addUserToGroup(user.id)}>
                  {!selectedUsrsId.includes(user.id) ? (
                    <span
                      className={cn(
                        buttonVariants(),
                        'flex items-center gap-0.5',
                      )}
                    >
                      <FiPlus className="text-[15px]" />
                      Add
                    </span>
                  ) : (
                    <span
                      className={cn(
                        buttonVariants(),
                        'bg-muted text-muted-foreground hover:text-muted',
                      )}
                    >
                      <MdOutlineCheck className="text-[15px]" />
                      Added
                    </span>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
        {/* submit button */}
        <div className="w-full text-sm flex justify-end gap-3 absolute left-0 bottom-0 p-5">
          <Button
            variant={'destructive'}
            onClick={() => onClose(false)}
            className="h-auto py-2.5 px-5"
          >
            Cancel
          </Button>
          <Button onClick={handleCreateGroup} className="h-auto py-2.5 px-5">
            {isCreating ? (
              <span className="flex items-center gap-1.5">
                <Spinner className="w-4 h-4 border-2" /> Creating...
              </span>
            ) : (
              <span>Create group</span>
            )}
          </Button>
        </div>
      </section>
    </Portal>
  );
};

export default CreateGroupModal;
