import express from "express";
import { mongoose } from "mongoose";

mongoose
  .connect("env")
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
