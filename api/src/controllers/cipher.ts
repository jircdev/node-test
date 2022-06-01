import { Request, Response } from 'express';
import crypto from 'crypto';

const algorithm = 'aes-256-cbc';
const secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3';
const initVector = '88bd658f02cea5b2';

export const encrypt = (req: Request, res: Response) => {
  const { value } = req.body;

  let cipher = crypto.createCipheriv(algorithm, secretKey, initVector);
  let result = cipher.update(value, 'utf-8', 'hex');

  result += cipher.final('hex');

  res.status(200).json({
    ok: true,
    msg: `value encryted`,
    result,
  });
};

export const decrypt = (req: Request, res: Response) => {
  const { value } = req.body;

  let decipher = crypto.createDecipheriv(algorithm, secretKey, initVector);
  let result = decipher.update(value, 'hex', 'utf-8');

  result += decipher.final('utf8');

  res.status(200).json({
    ok: true,
    msg: `value decryted`,
    result,
  });
};
