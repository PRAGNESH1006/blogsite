import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    email === "" ||
    username === "" ||
    password === ""
  ) {
    return res.status(400).json({ message: "All Feilds are required" });
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
    res.status(500).json({
      message: error.message,
      solution: "Email and Username must uniqe ",
    });
  }
};
