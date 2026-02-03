import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware.ts';
import { signUpUser } from '../controllers/users-controllers/signUpUser.controller.ts';
import { logInUser } from '../controllers/users-controllers/loginUser.controller.ts';
import { logOutUser } from '../controllers/users-controllers/logOutUser.controller.ts';
import { getAllUsers } from '../controllers/users-controllers/getAllUsers.controllers.ts';
import { getCurrentUser } from '../controllers/users-controllers/getCurrentUser.controller.ts';
import { editUserInfo } from '../controllers/users-controllers/editUserInfo.controllers.ts';
import { upload } from '../helper/multer.ts';

const userRoutes = Router();

userRoutes.post('/signup', signUpUser);
userRoutes.post('/signin', logInUser);
userRoutes.get('/logout', authMiddleware, logOutUser);
userRoutes.get('/get-all-users', authMiddleware, getAllUsers);
userRoutes.get('/me', authMiddleware, getCurrentUser);
userRoutes.put('/edit-profile',upload.single('avaterFile'), authMiddleware, editUserInfo);


export default userRoutes;
