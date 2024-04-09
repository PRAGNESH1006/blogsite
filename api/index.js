import express from "express";
import { mongoose } from "mongoose";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";

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

app.listen(3000, () => {
  console.log("server listening on port 3000");
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
