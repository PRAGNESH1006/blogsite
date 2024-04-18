import express from "express";
import { mongoose } from "mongoose";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";

mongoose
  .connect("mongodb+srv://pragneshpadhiyar:1234mp@blog.z7bxr9l.mongodb.net/")
  .then(() => {
    console.log(" db connected");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(express.json());
app.use(cookieParser());

app.listen(3000, () => {
  console.log("server listening on port 3000");
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
// app.use("/api/auth", authRoutes);

//middleware for error handling
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    message,
    statusCode,
    succese: false,
  });
});
