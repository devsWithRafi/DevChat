import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { createServer } from 'http';
import { CLIENT_URL, PORT } from './config/ENV.js';
import userRoutes from './routes/userRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import { initSocket } from './socket/socket.js';
import groupMsgRoutes from './routes/groupMsgRoutes.js';
// import dotenv from 'dotenv';

// dotenv.config();

const app = express();
const server = createServer(app);
export const io = initSocket(server);

app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(cookieParser());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Server is ok' });
});

app.use('/api/user', userRoutes);
app.use('/api/message', messageRoutes);
app.use('/api/group', groupMsgRoutes);

server.listen({ port: +PORT, host: '0.0.0.0' }, () =>
    console.log('Server is running on PORT:', PORT || 4000),
);
