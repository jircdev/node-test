import { Router } from 'express';
import { sendEmail } from '../controllers/email';

import { jwtValidator } from '../middlewares/jwt-validator';

export const emailRouter = Router();

emailRouter.use(jwtValidator);

emailRouter.post('/', [], sendEmail);
