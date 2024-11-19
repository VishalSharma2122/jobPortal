import express from 'express'
import cookieParser from 'cookie-parser';
import cors from "cors"
import dotenv from "dotenv";
import connectDB from './utils/db.js';
dotenv.config({})
import userRoute from './Routes/user.route.js'
const app = express()



//midilware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOption = {
    origin: 'http//localhost:5173',
    Credentials: true
}
app.use(cors(corsOption));
const PORT = process.env.PORT || 3000;



//api's

app.use("/api/v1/user",userRoute)

// connect to mongodb

app.listen(PORT, () => {
    connectDB();
    console.log(`http://localhost:${PORT}`)
})