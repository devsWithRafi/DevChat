import { useEffect, useState } from 'react';
import MessageBox from './MessageBox';
import MessageBoxSkeleton from './ui/MessageBoxSkeleton';
import { useSocket } from '../context/SocketContext';
import useFetchGroups from '../hooks/useFetchGroups';
import { useSearchParams } from 'react-router';
import useCurrentUser from '../hooks/useCurrentUser';
import type { MessageType } from '../types/Types';

const AllGroupMessages = () => {
    const { grpLoading, groups } = useFetchGroups();
    const [searchParams] = useSearchParams();
    const groupId = searchParams.get('groupid');
    const { currentUser } = useCurrentUser();
    const [groupMessages, setGroupMessages] = useState<MessageType[]>([]);

    const socket = useSocket();
    const findGroup = groups.find((g) => g.id === groupId);

    useEffect(() => {
        if (findGroup?.id) {
            setGroupMessages(findGroup.messages || []);
        }
    }, [findGroup?.id]);

    useEffect(() => {
        if (!socket || !groupId || !currentUser) return;

        const isUserInGroup = groups.some((g) =>
            g.members.some((m) => m.id === currentUser.id),
        );

        if (!isUserInGroup) return;

        socket.emit('join-group', groupId);

        const handleNewMessage = (msg: MessageType) => {
            setGroupMessages((prev) => {
                if (prev.some((m) => m.id === msg.id)) return prev;
                return [...prev, msg];
            });
        };

        socket.on('newGroupMessage', handleNewMessage);

        return () => {
            socket.emit('leave-group', groupId);
            socket.off('join-group');
        };
    }, [socket, groupId,currentUser?.id]);

    return (
        <div className="overflow-y-auto h-[82%] max-[767px]:h-[calc(100%-80px)] flex flex-col py-5">
            {!grpLoading && <>        
                {groupMessages?.length ? (
                    groupMessages.map((msg) => (
                        <MessageBox key={msg.id} message={msg} />
                    ))
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        Sart your first message
                    </div>
                )}
            </>}

            {grpLoading &&
                [...Array(3)].map((_, index) => (
                    <MessageBoxSkeleton
                        key={index}
                        position={index % 3 === 0 ? 'left' : 'right'}
                    />
                ))}
        </div>
    );
};

export default AllGroupMessages;
