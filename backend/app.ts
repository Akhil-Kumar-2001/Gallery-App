import express,{Request,Response} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/dbConfig';
import userRouter from './routes/router';




dotenv.config();

const app = express();
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}))

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

//connect to the database
connectDB()


app.get('/', (req:Request, res:Response) => {
    res.send('Welcome to the backend server!');
}
);

app.use('/api/user',userRouter)


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}
); 