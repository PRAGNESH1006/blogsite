import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";
//sign up
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
    return next(errorHandler(400, "All Feilds are required")); // from utils.js
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

// sign in with credentials
export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    return next(errorHandler(400, "All Feilds are required")); // from utils.js
  }
  // for finding user by email
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found")); // from utils.js
    }

    // for checking the password
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Password is incorrect")); // from utils.js
    }
    // for checking the password and validating the password
    const secretToken = "processenvSECRETTOKEN";
    const token = jwt.sign({ id: validUser._id }, secretToken, {
      expiresIn: 86400, // expires in 24 hours
    });

    const { password: pass, ...rest } = validUser._doc; //for hiding the password

    // for showing the user data and storing the user data in cookies form on browser side
    res
      .status(200)
      .cookie("access_token", token, { httpOnly: true })
      .json(rest);
  } catch (error) {
    next(error);
  }
};
