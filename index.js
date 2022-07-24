import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRoutes from "./routes/users.js"
import reviewRoutes from "./routes/reviews.js"
import videoRoutes from "./routes/videos.js"
import authRoutes from "./routes/auth.js"
import cookieParser from "cookie-parser"
import cors from 'cors'

const app = express()
const port = process.env.PORT || 5000
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser())

dotenv.config()

const connect = () => {
    mongoose
    .connect(process.env.MONGO)
    .then(() => {
        console.log("Connected to Mongodb");
    })
    .catch((err) => {
            throw err;
        })
}

app.use(express.json())
app.use("/api/auth",authRoutes)
app.use("/api/users",userRoutes)
app.use("/api/review",reviewRoutes)
app.use("/api/video",videoRoutes)

//error handler
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong!";
    return res.status(status).json({
      success: false,
      status,
      message,
    });
  });



app.listen(port, () => {
    connect()
    console.log(`App running on port ${port}`)
})