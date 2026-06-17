import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { getAllUsers } from '../controllers/users-controllers/getAllUsers.controllers.js';
import { getCurrentUser } from '../controllers/users-controllers/getCurrentUser.controller.js';
import { editUserInfo } from '../controllers/users-controllers/editUserInfo.controllers.js';
import { upload } from '../helper/multer.js';

const userRoutes = Router();

userRoutes.get('/get-all-users', authMiddleware, getAllUsers);
userRoutes.get('/me', authMiddleware, getCurrentUser);
userRoutes.put(
  '/edit-profile',
  upload.single('avaterFile'),
  authMiddleware,
  editUserInfo,
);

export default userRoutes;
