import userRouter from '@/routes/userRouter';
import { errorMiddleware } from '@/middleware/errorMiddleware';
import authRouter from '@/routes/authRouter';
import cors from 'cors';
import express from 'express';
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use(errorMiddleware);

app.listen(port, () => {
    console.log('Server listening on port ', port);
});
