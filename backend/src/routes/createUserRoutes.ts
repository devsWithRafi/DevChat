import express from 'express';
import { signUpUser } from '../controllers/users-controllers/signUpUser.controller.js';
const webhookRouter = express.Router();

webhookRouter.post(
  '/clerk-webhooks',
  express.raw({ type: 'application/json' }),
  signUpUser,
);

export default webhookRouter;
