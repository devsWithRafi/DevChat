import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware.ts';

import { upload } from '../helper/multer.ts';
import { sendMessage } from '../controllers/message-controllers/sendMessage.controller.ts';
import { deleteMessage } from '../controllers/message-controllers/deleteMessage.controller.ts';
import { getConversations } from '../controllers/message-controllers/getConversation.controller.ts';
import { getUserMedia } from '../controllers/message-controllers/getUserMedia.controllers.ts';

const messageRoutes = Router();

messageRoutes.post(
    '/send/:id',
    upload.single('image'),
    authMiddleware,
    sendMessage,
);
messageRoutes.get('/conversation/:othersId', authMiddleware, getConversations);
messageRoutes.get('/get-media/:userId', authMiddleware, getUserMedia);
messageRoutes.delete('/delete/:msgId', authMiddleware, deleteMessage);

export default messageRoutes;
