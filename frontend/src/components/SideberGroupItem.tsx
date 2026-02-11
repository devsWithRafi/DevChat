import { Link } from 'react-router';
import type { GroupType } from '../types/Types';
import { cn } from '../lib/utils';
import { BiDotsVertical } from 'react-icons/bi';
import defaultGroupAvater from '../assets/default-avater/default-group-avater.png';
import useCurrentUser from '../hooks/useCurrentUser';
import { useState } from 'react';
import UpdateGroupModal from './modals/UpdateGroupModal';

interface SideberItemProps {
    group: GroupType;
    selectedGroupId: string | null;
}

const SideberGroupItem = ({ group, selectedGroupId }: SideberItemProps) => {
    const { currentUser } = useCurrentUser();
    const [groupEditClick, setGroupEditClick] = useState<boolean>(false);

    return (
        <>
            <Link
                to={`/?groupid=${group.id}`}
                key={group.id}
                className={cn(
                    'flex items-center justify-between gap-4 py-2 px-4 cursor-pointer rounded-md',
                    selectedGroupId === group.id && 'bg-white/10',
                )}
            >
                <div className="w-full flex items-center gap-4">
                    <div className="w-9 h-9 rounded-full overflow-hidden bg-zinc-800 relative">
                        <img
                            src={group.groupsAvater || defaultGroupAvater}
                            className="w-full min-h-full rounded-full"
                        />
                    </div>
                    <div className="capitalize">
                        <h2 className="font-space font-medium text-[15px] text-ellipsis">
                            {group.name}
                        </h2>
                        <p className="text-[10px] text-zinc-400">
                            {group.members.length} members
                        </p>
                    </div>
                </div>
                {group.groupAdminId === currentUser?.id && (
                    <button
                        onClick={() => setGroupEditClick((prev) => !prev)}
                        className="cursor-pointer"
                    >
                        <BiDotsVertical />
                    </button>
                )}
            </Link>
            {/* edit group protal */}
            {groupEditClick && (
                <UpdateGroupModal group={group} onClose={setGroupEditClick} />
            )}
        </>
    );
};

export default SideberGroupItem;
