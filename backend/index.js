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
import path from 'path'



const __dirname = path.resolve()


//midilware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const allowedOrigins = [
  "http://localhost:5173", // For local development
  "https://jobportal-2hn1.onrender.com" // Deployed frontend
];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
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

app.use(express.static(path.join(__dirname, "./frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});


// connect to mongodb

app.listen(PORT, () => {
    connectDB();
    console.log(`http://localhost:${PORT}`)
})