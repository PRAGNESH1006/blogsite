import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    email === "" ||
    username === "" ||
    password === ""
  ) {
    next(errorHandler(400, "All Feilds are required")); // from utils.js
  }

  // for creating new users

  const hashPassword = bcryptjs.hashSync(password, 10); // for hashPassword

  const newUser = new User({
    username,
    email,
    password: hashPassword,
  });

  try {
    await newUser.save();
    res.json("You'r Signup has been successfully");
  } catch (error) {
    next(error);
  }
};
