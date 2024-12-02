import express from 'express'
import cookieParser from 'cookie-parser';
import cors from "cors"
import dotenv from "dotenv";
import connectDB from './utils/db.js';
dotenv.config({})
import userRoute from './Routes/user.route.js'
import companyRoute from './Routes/company.route.js'
import jobRoute from './Routes/job.route.js'
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

app.use("/api/v1/user",userRoute);
app.use("/api/v1/company",companyRoute);
app.use("/api/v1/job",jobRoute);


// connect to mongodb

app.listen(PORT, () => {
    connectDB();
    console.log(`http://localhost:${PORT}`)
})