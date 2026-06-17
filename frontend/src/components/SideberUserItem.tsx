import { Link } from 'react-router';
import type { UserType } from '../types/Types';
import { cn } from '../lib/utils';
import defaultAvater from '../assets/default-avater/default-male-avater.png';

interface SideberItemProps {
  user: UserType;
  selectedUserId: string | null;
  onlineUsers: string[];
}

const SideberUserItem = ({
  user,
  selectedUserId,
  onlineUsers,
}: SideberItemProps) => {
  return (
    <Link
      to={`/?userid=${user.id}`}
      key={user.id}
      className={cn(
        'flex items-center gap-4 p-2 cursor-pointer rounded',
        selectedUserId === user.id && 'bg-muted',
      )}
    >
      <div className="w-9 h-9 rounded-full relative">
        <img
          src={user.avatar || defaultAvater}
          className="w-full min-h-full rounded-full"
        />
        {onlineUsers.includes(user.id) && (
          <span className="bg-green-400 w-2.5 h-2.5 border-2 border-background rounded-full absolute bottom-1 -right-0.5" />
        )}
      </div>
      <div className="capitalize">
        <h2 className="font-space font-medium text-[15px] text-ellipsis">
          {user.name}
        </h2>
        <p
          className={cn(
            'text-[10px]',
            onlineUsers.includes(user.id) ? 'text-green-400' : 'text-zinc-400',
          )}
        >
          {onlineUsers.includes(user.id) ? 'Online' : 'Offline'}
        </p>
      </div>
    </Link>
  );
};

export default SideberUserItem;
