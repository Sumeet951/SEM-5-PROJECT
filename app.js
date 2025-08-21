import express from "express";
import cookieParser from 'cookie-parser';
import cors from "cors";
import {config} from 'dotenv';
import morgan from 'morgan';
import errorMiddleware from "./middleware/error.middleware.js";
import userRoutes from "./routes/userRoutes.js";
const app= express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin:'http://localhost:5173', // frontend url accesing
    credentials:true
}));
app.use(morgan('dev'));
app.use(cookieParser());

//Routes
app.use('/api/v1/user',userRoutes);
app.use(errorMiddleware);
export default app;
