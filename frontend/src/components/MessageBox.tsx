import { useEffect, useRef } from 'react';
import type { MessageType } from '../types/Types';
import defaultAvater from '../assets/default-avater/default-male-avater.png';
import { cn } from '../lib/utils';
import useCurrentUser from '../hooks/useCurrentUser';
import useFetchUsers from '../hooks/useFetchUsers';
import { useSearchParams } from 'react-router';
import formateTimes from '../hooks/formateTimes';

type MessageBoxProps = {
    message: MessageType;
};

const MessageBox: React.FC<MessageBoxProps> = ({
    message,
    ...props
}) => {
    const messageBoxRef = useRef<HTMLElement | null>(null);
    const { currentUser } = useCurrentUser();
    const [searchParams] = useSearchParams();
    const userId = searchParams.get('userid');
    const { users } = useFetchUsers();
    const findReciver = users.find((user) => user.id === userId);

    useEffect(() => {
        if (messageBoxRef.current) {
            messageBoxRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    console.log( new Date(message.createdAt) )

    return (
        <section
            className={cn(
                'w-full flex flex-col max-w-full',
                message.senderId === currentUser?.id
                    ? 'items-end'
                    : 'items-start',
            )}
            ref={messageBoxRef}
            {...props}
        >
            <div className="max-w-90 flex flex-col">
                {/* top */}
                <div
                    className={cn(
                        'bg-white/10 text-sm overflow-hidden rounded-[20px_20px_20px_0px] ml-8 p-2 relative max-w-full wrap-break-word',
                        message.senderId === currentUser?.id &&
                            'rounded-[20px_20px_0px_20px] ml-0 mr-8 bg-purple-500/40',
                    )}
                >
                    {message.image && (
                        <div className="w-full overflow-hidden rounded-[12px]">
                            <img
                                src={message.image}
                                alt=""
                                className="w-full"
                            />
                        </div>
                    )}
                    {message.text && <h2 className="p-3 text-wrap">{message.text}</h2>}
                </div>
                {/* bottom */}
                <div
                    className={cn(
                        'flex items-center justify-between py-3',
                        message.senderId === currentUser?.id &&
                            'flex-row-reverse',
                    )}
                >
                    <div className="bg-zinc-800 h-7 w-7 rounded-full overflow-hidden">
                        <img
                            src={
                                (message.senderId === currentUser?.id
                                    ? currentUser.avater
                                    : findReciver?.avater) || defaultAvater
                            }
                            alt=""
                            className="w-full"
                        />
                    </div>
                    <p className="text-xs text-zinc-500">{formateTimes(message.createdAt)}</p>
                </div>
            </div>
        </section>
    );
};

export default MessageBox;
