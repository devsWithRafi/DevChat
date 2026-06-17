import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { createServer } from 'http';
import { initSocket } from './socket/socket.js';
import userRoutes from './routes/userRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import groupMsgRoutes from './routes/groupMsgRoutes.js';
import { ENV } from './config/ENV.js';
import { clerkMiddleware } from '@clerk/express';
import webhookRouter from './routes/createUserRoutes.js';

const app = express();
const server = createServer(app);
export const io = initSocket(server);

app.use("/api/user", webhookRouter); // before -> app.use(express.json());

app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(clerkMiddleware({}));

app.get('/', (req, res) => {
  res.json({ message: 'Server is ok' });
});

app.use('/api/user', userRoutes);
app.use('/api/message', messageRoutes);
app.use('/api/group', groupMsgRoutes);

server.listen({ port: +ENV.PORT, host: '0.0.0.0' }, () => {
  console.log('Server is running on PORT:', ENV.PORT || 4000);
  console.log('Client url:', ENV.CLIENT_URL);
});
