import express from 'express'
const app = express()
import cookieParser from 'cookie-parser';
import cors from "cors"
import dotenv from "dotenv";
import connectDB from './utils/db.js';
dotenv.config({})
import userRoute from './Routes/user.route.js'
import companyRoute from './Routes/company.route.js'
import jobRoute from './Routes/job.route.js'
import applicationRoute from "./Routes/application.route.js"




//midilware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type, Authorization",
  })
);
const PORT = process.env.PORT || 3000;



//api's

app.use("/api/v1/user",userRoute);
app.use("/api/v1/company",companyRoute);
app.use("/api/v1/job",jobRoute);
app.use("/api/v1/application",applicationRoute);


// connect to mongodb

app.listen(PORT, () => {
    connectDB();
    console.log(`http://localhost:${PORT}`)
})