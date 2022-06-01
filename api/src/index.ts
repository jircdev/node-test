import express, { Express } from 'express';
import path from 'path';
import cors from 'cors';
import { config } from 'dotenv';
import { dbConnection } from './database/config';
import { userRouter } from './routes/auth';
import { cipherRouter } from './routes/cipher';
import { uploadRouter } from './routes/upload';
import { dbConnectionSatus } from './middlewares/dbConectionStatus';
import { sendEmail } from './controllers/email';
import { emailRouter } from './routes/email';

config();

const app: Express = express();

dbConnection();

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static('public'));
app.use(express.static('uploads/images'));
app.use(express.json());

app.use('/api/cipher', cipherRouter);
app.use('/api/uploads', uploadRouter);
app.use('/api/email', emailRouter);
app.use(dbConnectionSatus);
app.use('/api/auth', userRouter);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`⚡️[server]: Servidor corriendo en https://localhost:${port}`);
});
