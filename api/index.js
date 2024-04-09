import express from "express";
import { mongoose } from "mongoose";
import userRouters from "./routes/user.route.js";

mongoose
  .connect("mongodb+srv://pragneshpadhiyar:1234mp@blog.z7bxr9l.mongodb.net/")
  .then(() => {
    console.log(" db connected");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.listen(3000, () => {
  console.log("frist server listening on port this 3000");
});

app.use("/user", userRouters);
