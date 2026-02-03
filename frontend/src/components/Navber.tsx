import defaultAvater from '../assets/default-avater/default-male-avater.png';
import { useState } from 'react';
import { cn } from '../lib/utils';
import { useSearchParams } from 'react-router';
import useFetchUsers from '../hooks/useFetchUsers';
import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';

const Navber = () => {
    const [avaterLoaded, setAvaterLoaded] = useState<boolean>(false);
    const [searchParams] = useSearchParams();
    const userId = searchParams.get('userid');
    const { users } = useFetchUsers();
    const findUser = users.find((user) => user.id === userId);
    const onlineUsers = useSelector((state: RootState) => state.onlineUsers);

    return (
        <header className="w-full h-15 flex gap-2 items-center border-b border-white/20">
            <div className="w-10 h-10 rounded-full bg-zinc-800 capitalize overflow-hidden">
                <img
                    src={findUser?.avater || defaultAvater}
                    className={cn(
                        'w-full duration-200 opacity-0',
                        avaterLoaded && 'opacity-100',
                    )}
                    onLoad={() => setAvaterLoaded(true)}
                />
            </div>
            <div className="font-medium text-lg relative items-center flex ">
                {findUser?.name}
                {findUser && onlineUsers.includes(findUser.id) && <div className="flex items-center justify-center absolute -right-5">
                    <span className="bg-green-400 w-2 h-2 rounded-full absolute" />
                    <span className="bg-green-400/50 w-3 h-3 rounded-full absolute animate-ping" />
                </div>}
            </div>
        </header>
    );
};

export default Navber;
