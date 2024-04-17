import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilephoto: {
      type: String,
      default:
        "https://cdn.lazyshop.com/files/273d4985-ae97-40da-84b1-98340e6f292c/product/6dcc29e0d201aec049623f30ace68e56.jpeg?x-oss-process=style%2Fthumb",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
