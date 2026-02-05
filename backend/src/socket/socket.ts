import { Server } from 'socket.io';
import http from 'http';
import { CLIENT_URL } from '../config/ENV.ts';
import getPrivateRoomId from '../helper/getPrivateRoomId.ts';
import { prisma } from '../lib/prisma.ts';
import { JoinSocketGroup } from './joinGroup.ts';

export const initSocket = (server: http.Server) => {
    const io = new Server(server, {
        cors: {
            origin: CLIENT_URL,
            methods: ['GET', 'POST'],
            credentials: true,
        },
    });


    const userSocketMap: { [key: string]: string } = {};

    io.on('connection', (socket) => {
        console.log('User connected id:', socket.id);
        // current users is
        const authUserId = socket.handshake.auth.authUserId;

        if (authUserId) {
            userSocketMap[authUserId] = socket.id;
        }
        // GET ONLINE USERS
        io.emit('getOnlineUsers', Object.keys(userSocketMap));

        // ADD USER TO GROUP room
        socket.on('join-group', async (groupId) => {
            await JoinSocketGroup(socket, authUserId, groupId);
        });

        socket.on("leave-group", (groupId) => socket.leave(groupId))

        // ADD USER TO PRIVATE 1-TO-1 room
        socket.on('join-private-room', ({ senderId, receiverId }) => {
            const roomId = getPrivateRoomId(senderId, receiverId);

            if (socket.rooms.has(roomId)) return;

            socket.join(roomId);

            console.log(`Joined private room: ${roomId}`);
        });

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);

            for (const userId in userSocketMap) {
                if (userSocketMap[userId] === socket.id) {
                    delete userSocketMap[userId];
                    break;
                }
            }
            io.emit('getOnlineUsers', Object.keys(userSocketMap));
        });
    });

    return io;
};
