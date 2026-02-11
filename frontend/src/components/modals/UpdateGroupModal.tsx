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
import toast from 'react-hot-toast';
import Spinner from '../ui/Spinner';
import type { GroupType } from '../../types/Types';
import useUpdateGroup from '../../hooks/useUpdateGroup';
import useFetchGroups from '../../hooks/useFetchGroups';
import useDeletingGroup from '../../hooks/useDeleteGroup';

interface UpdateGroupModalProps {
    onClose: Dispatch<SetStateAction<boolean>>;
    group: GroupType;
}

const UpdateGroupModal = ({ onClose, group }: UpdateGroupModalProps) => {
    const { users } = useFetchUsers();
    const { fetchGroups } = useFetchGroups();
    const [searchInput, setSearchInput] = useState<string>('');
    const [groupInput, setGroupInput] = useState({
        name: group.name,
        bio: group.bio,
    });
    const [avaterFile, setAvaterFile] = useState<File | null>(null);
    const [selectedUsrsId, setSelectedUsersId] = useState<string[]>(
        group.members.map((m) => m.id),
    );
    const { handleUpdateGroup, isUpdating, error } = useUpdateGroup();
    const {
        handleDeleteGroup,
        isDeleting,
        error: deletingError,
    } = useDeletingGroup();

    const totalMembers = selectedUsrsId.length;
    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchInput.toLowerCase()),
    );

    const addUserToGroup = (userId: string) => {
        const isUserAlreadyAdded = selectedUsrsId.includes(userId);
        if (isUserAlreadyAdded) {
            setSelectedUsersId((prev) => prev.filter((id) => id !== userId));
        } else {
            setSelectedUsersId((prev) => [...prev, userId]);
        }
    };

    const handleUpdate = async () => {
        if (!group) {
            return toast.error('An error occoured! - Group not selected');
        }
        if (selectedUsrsId.length < 2) {
            return toast.error('Add at least 2 members to create a group');
        }
        if (!groupInput.name.trim()) {
            return toast.error('Group name is required');
        }
        const success = await handleUpdateGroup({
            groupId: group.id,
            name: groupInput.name,
            bio: groupInput.bio || '',
            groupAvaterFile: avaterFile,
            membersIds: selectedUsrsId,
        });

        if (success) {
            setGroupInput({ name: '', bio: '' });
            setAvaterFile(null);
            setSelectedUsersId([]);
            fetchGroups();
            onClose(false);
            return toast.success('Group updated successfully');
        }
        return toast.error(error || 'Failed to updated group');
    };

    const handleDelete = async () => {
        if (!group) {
            return toast.error('An error occoured! - Group not selected');
        }
        const success = await handleDeleteGroup({ groupId: group.id });

        if (success) {
            fetchGroups();
            onClose(false);
            return toast.success('Group deleted successfully');
        }
        return toast.error(deletingError || 'Failed to delete group');
    };

    return (
        <Portal onClose={onClose}>
            <section className="w-200 h-[90vh] relative overflow-hidden bg-black/60 rounded-xl border border-white/10 p-8 max-[888px]:w-150 max-[615px]:w-100 max-[430px]:w-[95vw]">
                {/* TOP */}
                <div className="flex w-full gap-5 items-center max-[615px]:flex-col max-[615px]:gap-0">
                    <div className="min-w-40 max-w-40 aspect-square rounded-full overflow-hidden mb-5 max-[615px]:mb-0 relative cursor-pointer max-[888px]:min-w-30 max-[888px]:w-30 max-[615px]:w-25 max-[615px]:min-w-25">
                        <img
                            src={
                                avaterFile
                                    ? URL.createObjectURL(avaterFile)
                                    : defaultGroupAvater || group.groupsAvater
                                      ? group.groupsAvater!
                                      : defaultGroupAvater
                            }
                            className="w-full"
                        />
                        <label
                            htmlFor="avaterFile"
                            className="absolute w-full h-full top-0 left-0 bottom-0 right-0 bg-black/50 rounded-full flex items-center justify-center cursor-pointer"
                        >
                            <LuCamera className="text-white text-[34px] max-[615px]:text-[25px]" />
                        </label>
                        <input
                            type="file"
                            id="avaterFile"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) =>
                                setAvaterFile(
                                    e.target.files && e.target.files[0],
                                )
                            }
                        />
                    </div>
                    <div className="w-full flex flex-col gap-5 max-[615px]:gap-2">
                        <input
                            type="text"
                            placeholder="Group Name"
                            value={groupInput.name}
                            onChange={(e) =>
                                setGroupInput((prev) => ({
                                    ...prev,
                                    name: e.target.value,
                                }))
                            }
                            className="border-b border-white/20 px-3 py-2 outline-0 focus:border-white/50 max-[888px]:text-xs"
                        />
                        <input
                            type="text"
                            value={groupInput.bio || ''}
                            placeholder="Group Description (optional)"
                            onChange={(e) =>
                                setGroupInput((prev) => ({
                                    ...prev,
                                    bio: e.target.value,
                                }))
                            }
                            className="border-b border-white/20 px-3 py-2 outline-0 focus:border-white/50 max-[888px]:text-xs"
                        />
                        <h2 className="text-zinc-300 text-sm max-[888px]:text-xs">
                            Total members: {totalMembers}
                        </h2>
                    </div>
                </div>
                {/* BOTTOM */}
                <div className="w-full h-full flex mt-5 flex-col gap-3 overflow-y-auto">
                    <div className="w-full py-2 flex items-center gap-2 focus-within:border-white/50 border-b border-white/20">
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
                                className="flex items-center gap-3 justify-between py-2 cursor-pointer hover:bg-white/5 px-5 rounded-md max-[615px]:px-0"
                            >
                                <div className="flex items-center gap-3">
                                    <img
                                        src={user.avater || defaultUserAvater}
                                        className="w-13 max-[888px]:w-10 rounded-full aspect-square"
                                    />
                                    <div>
                                        <h2 className="font-medium text-lg max-[888px]:text-sm">
                                            {user.name}
                                        </h2>
                                        <p className="text-sm text-zinc-400 font-normal max-[888px]:text-xs">
                                            {user.bio || 'No bio yet'}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => addUserToGroup(user.id)}
                                    className={cn(
                                        'cursor-pointer text-sm text-white bg-gradient-to-r from-blue-800 to-indigo-900 px-4 py-1 rounded-full max-[888px]:text-xs',
                                        selectedUsrsId.includes(user.id) &&
                                            'bg-white/10',
                                    )}
                                >
                                    {!selectedUsrsId.includes(user.id) ? (
                                        <span className="flex items-center gap-0.5">
                                            <FiPlus className="text-[15px]" />
                                            Add
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-0.5">
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
                    <button
                        onClick={() => onClose(false)}
                        className="px-4 cursor-pointer py-2 bg-zinc-800 rounded-md hover:bg-zinc-700 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleDelete}
                        className="px-4 cursor-pointer py-2 bg-red-500 text-white font-medium rounded-md hover:opacity-95 transition-opacity"
                    >
                        {!isDeleting ? 'Delete' : <Spinner className='border-2 w-5 h-5'/>}
                    </button>
                    <button
                        onClick={handleUpdate}
                        className="px-4 cursor-pointer py-2 bg-white text-zinc-900 font-medium rounded-md hover:opacity-95 transition-opacity"
                    >
                        {isUpdating ? (
                            <span className="flex items-center gap-1.5 text-zinc-400">
                                <Spinner className="w-4 h-4 border-2" />
                                Updating...
                            </span>
                        ) : (
                            <span>Update</span>
                        )}
                    </button>
                </div>
            </section>
        </Portal>
    );
};

export default UpdateGroupModal;
