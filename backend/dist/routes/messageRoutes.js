import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { upload } from '../helper/multer.js';
import { sendMessage } from '../controllers/message-controllers/sendMessage.controller.js';
import { deleteMessage } from '../controllers/message-controllers/deleteMessage.controller.js';
import { getConversations } from '../controllers/message-controllers/getConversation.controller.js';
import { getUserMedia } from '../controllers/message-controllers/getUserMedia.controllers.js';
const messageRoutes = Router();
messageRoutes.post('/send/:id', upload.single('image'), authMiddleware, sendMessage);
messageRoutes.get('/conversation/:othersId', authMiddleware, getConversations);
messageRoutes.get('/get-media/:userId', authMiddleware, getUserMedia);
messageRoutes.delete('/delete/:msgId', authMiddleware, deleteMessage);
export default messageRoutes;
//# sourceMappingURL=messageRoutes.js.map