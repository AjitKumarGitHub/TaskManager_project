import express from "express";
import dotenv from 'dotenv';
import dbConnect from "./db/dbConnect.js";
import userRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import cookieParser from "cookie-parser";
import cors from 'cors'
import bodyParser from "body-parser";
const app = express();
const Port =process.env.Port;

dotenv.config();
app.use(cors({
    origin: 'https://selftaskmanage.vercel.app', // Adjust this to your frontend's URL
    credentials: true // If you need to send cookies or authorization headers
}));
app.use(bodyParser.json())
app.use(express.json());
app.use(cookieParser())
app.use('/api/users', userRoutes);
app.use('/api/task',taskRoutes)

const startServer = async () => {
    await dbConnect();  
    app.listen(Port, () => {
        console.log(`The server is running on port number ${Port}`);
    });
};

startServer();