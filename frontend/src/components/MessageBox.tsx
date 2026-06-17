import { useEffect, useRef, useState } from 'react';
import type { MessageType } from '../types/Types';
import defaultAvater from '../assets/default-avater/default-male-avater.png';
import { cn } from '../lib/utils';
import formateTimes from '../hooks/formateTimes';
import { useUser } from '@clerk/react';

type MessageBoxProps = {
  message: MessageType;
};

const MessageBox: React.FC<MessageBoxProps> = ({ message, ...props }) => {
  const messageBoxRef = useRef<HTMLElement | null>(null);
  const { user } = useUser();
  const [seemoreActive, setSeemoreActive] = useState(false);

  const messageSenderAvater = message.sender?.avatar || defaultAvater;

  useEffect(() => {
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const messageText =
    message.text &&
    (seemoreActive
      ? message.text
      : message.text.length > 1000
        ? message.text.slice(0, 1000) + '...'
        : message.text);

  return (
    <section
      className={cn(
        'w-full flex flex-col max-w-full',
        message.senderId === user?.id ? 'items-end' : 'items-start',
      )}
      ref={messageBoxRef}
      {...props}
    >
      <div className="max-w-135 max-[767px]:max-w-70 flex flex-col">
        {/* top */}
        <div
          className={cn(
            'bg-card border text-sm overflow-hidden rounded-[10px_10px_10px_0px] ml-8 p-2 relative max-w-full wrap-break-word',
            message.senderId === user?.id &&
              'rounded-[10px_10px_0px_10px] max-[767px]:rounded-[10px_10px_0px_10px] ml-0 mr-8 bg-muted border-0',
          )}
        >
          {message.image && (
            <div className="w-full overflow-hidden rounded max-[767px]:rounded-[5px] flex flex-col">
              <img src={message.image} className="w-full" />
            </div>
          )}
          {message.text && (
            <div className="p-3 overflow-hidden max-[767px]:p-1 text-wrap text-xs flex flex-col gap-2 relative">
              <span className="overflow-hidden">{messageText}</span>
              {message.text.length > 1000 && (
                <span
                  className="text-sm text-muted-foreground leading-0 cursor-pointer hover:text-primary"
                  onClick={() => setSeemoreActive((prev) => !prev)}
                >
                  {seemoreActive ? 'See less' : 'See more'}
                </span>
              )}
            </div>
          )}
        </div>
        {/* bottom */}
        <div
          className={cn(
            'flex items-start gap-2 max-[767px]:py-1',
            message.senderId === user?.id && 'flex-row-reverse',
          )}
        >
          <div className="bg-zinc-800 h-7 w-7 max-[767px]:w-5 max-[767px]:h-5 rounded-full overflow-hidden">
            <img src={messageSenderAvater} className="w-full h-full" />
          </div>
          <p className="text-[10px] text-left text-muted-foreground mt-1">
            {formateTimes(message.createdAt)}
          </p>
        </div>
      </div>
    </section>
  );
};

export default MessageBox;
