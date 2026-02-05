import { useEffect, useRef } from 'react';
import type { MessageType } from '../types/Types';
import defaultAvater from '../assets/default-avater/default-male-avater.png';
import { cn } from '../lib/utils';
import useCurrentUser from '../hooks/useCurrentUser';
import formateTimes from '../hooks/formateTimes';

type MessageBoxProps = {
    message: MessageType;
};

const MessageBox: React.FC<MessageBoxProps> = ({ message, ...props }) => {
    const messageBoxRef = useRef<HTMLElement | null>(null);
    const { currentUser } = useCurrentUser();

    const messageSenderAvater = message.sender?.avater || defaultAvater;

    useEffect(() => {
        if (messageBoxRef.current) {
            messageBoxRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

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
            <div className="max-w-90 max-[767px]:max-w-70 flex flex-col">
                {/* top */}
                <div
                    className={cn(
                        'bg-white/10 text-sm overflow-hidden rounded-[20px_20px_20px_0px] max-[767px]:rounded-[10px_10px_10px_0px] ml-8 p-2 relative max-w-full wrap-break-word',
                        message.senderId === currentUser?.id &&
                            'rounded-[20px_20px_0px_20px] max-[767px]:rounded-[10px_10px_0px_10px] ml-0 mr-8 bg-purple-500/40',
                    )}
                >
                    {message.image && (
                        <div className="w-full overflow-hidden rounded-[12px] max-[767px]:rounded-[5px] flex flex-col">
                            <img src={message.image} className="w-full" />
                        </div>
                    )}
                    {message.text && (
                        <div className="p-3 max-[767px]:p-1 text-wrap text-xs flex flex-col">
                            <span>{message.text}</span>
                        </div>
                    )}
                </div>
                {/* bottom */}
                <div
                    className={cn(
                        'flex items-start gap-2 py-3 max-[767px]:py-1',
                        message.senderId === currentUser?.id &&
                            'flex-row-reverse',
                    )}
                >
                    <div className="bg-zinc-800 h-7 w-7 max-[767px]:w-5 max-[767px]:h-5 rounded-full overflow-hidden">
                        <img src={messageSenderAvater} className="w-full" />
                    </div>
                    <p className="text-xs text-left text-zinc-500">
                        {formateTimes(message.createdAt)}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default MessageBox;
