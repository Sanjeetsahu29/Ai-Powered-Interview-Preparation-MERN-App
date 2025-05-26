import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//Generate Token
export const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// @desc Register a new user
// @route POST /api/auth/register
// @access Public
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, profileImageUrl } = req.body;
    if (!name || !email || !password) {
      res.status(400).json({ message: "Please enter all fields" });
    }
    //check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: "User already exists" });
    }
    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      profileImageUrl,
    });
    //Return user data with jwt
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImageUrl: user.profileImageUrl,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(400).json({ message: "Server Error", error: error.message });
  }
};

//Check if user exists

// @desc Login a user
// @route POST /api/auth/login
// @access Public
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(500).json({ message: "Please enter all fields" });
    }
    //check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(500).json({ message: "Invalid email or password" });
    }
    //compare password
    const isMatch =  await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(500).json({ message: "Invalid email or password" });
    }
    //return user data with jwt
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImageUrl: user.profileImageUrl,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc Get user profile
// @route GET /api/auth/profile
// @access Private(require JWT)
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if(!user){
        return res.status(404).json({message:"User not found"})
    }
    res.json(user)
  } catch (error) {
    res.status(500).json({message:"Server error", error:error.message})
  }
};
