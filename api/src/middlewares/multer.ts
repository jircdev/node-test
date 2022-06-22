import fs from 'fs';
import { Request as Req } from 'express';
import multer, { FileFilterCallback as FFCB } from 'multer';
import { parseJwt } from '../helper/parseJwt';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const token = req.headers['x-token'];
    const { uid } = parseJwt(token);
    const dir = `./uploads/images/${uid}`;

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req: Req, file: Express.Multer.File, cb: FFCB) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 1000000 } });

export const uploader = upload.array('images');
