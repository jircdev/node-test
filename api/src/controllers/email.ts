import { Request, Response, NextFunction } from 'express';
import { Email, emailer } from '../helper/emailer';

export const sendEmail = async (req: Request, res: Response) => {
  const info: Email = req.body;

  emailer(info);

  res.status(200).json({
    ok: true,
    msg: 'Successfully sended email',
    result: '===============',
  });
};
