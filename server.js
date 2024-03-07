import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/usersRoutes.js';

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use('/api/user', userRoutes)

app.listen(port, () => console.log(`listening on ${port}`));