import { useEffect } from 'react';
import useConversations from '../hooks/useConversations';
import MessageBox from './MessageBox';
import MessageBoxSkeleton from './ui/MessageBoxSkeleton';
import { useSocket } from '../context/SocketContext';
import { useDispatch } from 'react-redux';
import { addNewMessagesIntoConversation } from '../features/conversationSlice';

const AllMessages = () => {
    const { loading, error, conversations } = useConversations();
    const dispatch = useDispatch()
    const socket = useSocket();


    useEffect(() => {
        socket?.on('newMessage', (msg) => {
            dispatch(addNewMessagesIntoConversation(msg))
        });

        return () => {
            socket?.off('newMessage');
        };
    }, [socket]);

    return (
        <div className="overflow-y-auto h-[82%] flex flex-col gap-2 py-5">
            {conversations?.messages?.length ? (
                conversations.messages.map((msg) => (
                    <MessageBox
                        key={msg.id}
                        message={msg}
                    />
                ))
            ) : (
                <div className="w-full h-full flex items-center justify-center">
                    Sart your first message
                </div>
            )}

            {loading && (
                [...Array(3)].map((_, index) => (
                    <MessageBoxSkeleton key={index} position={index % 3 === 0 ? 'left' : 'right'} />
                ))
            )}
        </div>
    );
};

export default AllMessages;
