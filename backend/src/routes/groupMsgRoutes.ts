import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware.ts';
import { upload } from '../helper/multer.ts';
import { createGroup } from '../controllers/groupChat-controllers/createGroup.controllers.ts';
import { sendGroupMessage } from '../controllers/groupChat-controllers/sendGroupMessage.ts';
import { getGroup } from '../controllers/groupChat-controllers/getGroup.controllers.ts';
import { getGroupsMedia } from '../controllers/groupChat-controllers/getGroupsMedia.ts';
import { addMemberToGroup } from '../controllers/groupChat-controllers/addMember.controllers.ts';
import { leaveGroup } from '../controllers/groupChat-controllers/leaveGroup.controllers.ts';
import { updateGroup } from '../controllers/groupChat-controllers/updateGroup.controllers.ts';
import { deleteGroup } from '../controllers/groupChat-controllers/deleteGroup.controllers.ts';

const groupMsgRoutes = Router();

groupMsgRoutes.post(
    '/create-new-group',
    upload.single('groupAvaterFile'),
    authMiddleware,
    createGroup,
);
groupMsgRoutes.post(
    '/send-group-message/:groupId',
    upload.single('imageFile'),
    authMiddleware,
    sendGroupMessage,
);

groupMsgRoutes.get('/get-groups', authMiddleware, getGroup);
groupMsgRoutes.get('/get-groups-media/:groupId', authMiddleware, getGroupsMedia);
groupMsgRoutes.put('/add-new-member/:groupId', authMiddleware, addMemberToGroup);
groupMsgRoutes.put('/remove-member/:groupId', authMiddleware, leaveGroup);

groupMsgRoutes.put('/update-group/:groupId', upload.single('groupAvaterFile'), authMiddleware, updateGroup);
groupMsgRoutes.delete('/delete-group/:groupId', authMiddleware, deleteGroup);

export default groupMsgRoutes;
