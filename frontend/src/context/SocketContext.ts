import { createContext, useContext } from 'react';
import { Socket } from 'socket.io-client';


export const SocketContext = createContext<Socket | null>(null);

export const useSocket = () => {
    const Socnxt = useContext(SocketContext);
    return Socnxt;
};
