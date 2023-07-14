import express from 'express';
import cors from 'cors';
import userRouter from '@/routes/user';
import { errorMiddleware } from '@/middleware/errorMiddleware';
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use('/api/user', userRouter);
app.use(errorMiddleware);

app.listen(port, () => {
    console.log('Server listening on port ', port);
});
