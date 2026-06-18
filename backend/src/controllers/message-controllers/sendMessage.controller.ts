import type { Request, Response } from 'express';
import { prisma } from '../../lib/prisma.js';
import { uploadImageToCloudinary } from '../../helper/uploadImageToCloudinary.js';
import getPrivateRoomId from '../../helper/getPrivateRoomId.js';
import { io } from '../../server.js';

export const sendMessage = async (req: Request, res: Response) => {
  const receiverId = req.params.id as string;
  const { text } = req.body || {};
  const imageFile = req.file;
  const authUserId = req.userId;

  if (!text && !imageFile) {
    return res
      .status(400)
      .json({ success: false, message: 'Message cannot be empty!' });
  }

  if (!authUserId) {
    return res.status(401).json({ success: false, message: 'Unauthorized!' });
  }

  if (!receiverId) {
    return res
      .status(400)
      .json({ success: false, message: 'Reciver id is required!' });
  }
  const isReceiverExist = await prisma.user.findUnique({
    where: { id: receiverId },
  });

  if (!isReceiverExist) {
    return res
      .status(404)
      .json({ success: false, message: 'Receiver not found' });
  }
  // messages
  const messages = { text: '', image: '' };

  if (text || text?.trim().length > 0) {
    messages.text = text;
  }
  if (imageFile) {
    const { secure_url } = await uploadImageToCloudinary(imageFile.buffer);
    messages.image = secure_url;
  }

  // IS CONVERSATION IS EXIST
  const conversation = await prisma.conversation.findFirst({
    where: {
      OR: [
        { senderId: authUserId, receiverId: receiverId },
        { senderId: receiverId, receiverId: authUserId },
      ],
    },
  });

  // IF CONVERSATION DOSENOT EXIST THEN CREATE
  const newConversation =
    conversation ??
    (await prisma.conversation.create({
      data: {
        senderId: authUserId,
        receiverId: receiverId,
      },
    }));

  // CREATE MESSAGES
  const newMessage = await prisma.message.create({
    data: {
      senderId: authUserId,
      receiverId: receiverId,
      text: messages.text,
      image: messages.image,
      conversationId: newConversation.id,
    },
    include: { sender: { omit: { password: true } } },
  });

  if (!newMessage) {
    return res.json({
      success: false,
      message: 'Something went wrong - please try again!',
    });
  }

  // socket io room
  const roomId = getPrivateRoomId(authUserId, receiverId);
  io.to(roomId).emit('newMessage', newMessage);

  return res.json(newMessage);
};
