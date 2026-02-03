import { useEffect, useRef, useState, type ReactNode } from 'react';
import { SocketContext } from './SocketContext';
import { io, Socket } from 'socket.io-client';
import useCurrentUser from '../hooks/useCurrentUser';
import { useDispatch } from 'react-redux';
import { addOnlineUsers } from '../features/onlineUserSlice';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const SocketProvider = ({ children }: { children: ReactNode }) => {
    const { currentUser } = useCurrentUser();
    const [socket, setSocket] = useState<Socket | null>(null);
    const socketRef = useRef<Socket | null>(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!currentUser) return;

        if (!socketRef.current) {
            const socket = io(SERVER_URL, {
                withCredentials: true,
                transports: ['websocket'],
                auth: { authUserId: currentUser.id },
            });

            socket.on('getOnlineUsers', (users) => {
                // console.log(users);
                dispatch(addOnlineUsers(users));
            });

            socketRef.current = socket;
            setSocket(socket);
        }

        return () => {
            // socket.disconnect();
            socketRef.current?.disconnect();
            socketRef.current = null; // clean up on unmount
            setSocket(null);
        };
    }, [currentUser, dispatch]);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;
