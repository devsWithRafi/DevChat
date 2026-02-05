import { Link } from "react-router";
import type { UserType } from "../types/Types";
import { cn } from "../lib/utils";
import defaultAvater from '../assets/default-avater/default-male-avater.png';

interface SideberItemProps {
      user: UserType
      selectedUserId: string | null;
      onlineUsers: string[];
}

const SideberUserItem = ({ user, selectedUserId, onlineUsers }: SideberItemProps) => {
    return (
        <Link
            to={`/?userid=${user.id}`}
            key={user.id}
            className={cn(
                'flex items-center gap-4 py-2 px-5 cursor-pointer rounded-md',
                selectedUserId === user.id && 'bg-white/10',
            )}
        >
            <div className="w-9 h-9 rounded-full bg-zinc-800 relative">
                <img
                    src={user.avater || defaultAvater}
                    className="w-full rounded-full"
                />
                {onlineUsers.includes(user.id) && (
                    <span className="bg-green-400 w-2.5 h-2.5 border-[2px] border-black rounded-full absolute bottom-1 -right-0.5" />
                )}
            </div>
            <div className="capitalize">
                <h2 className="font-space font-medium text-[15px] text-ellipsis">{user.name}</h2>
                <p
                    className={cn(
                        'text-[10px]',
                        onlineUsers.includes(user.id)
                            ? 'text-green-400'
                            : 'text-zinc-400',
                    )}
                >
                    {onlineUsers.includes(user.id) ? 'Online' : 'Offline'}
                </p>
            </div>
        </Link>
    );
};

export default SideberUserItem;
