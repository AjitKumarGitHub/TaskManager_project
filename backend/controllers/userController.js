import mongoose from "mongoose";
import User from "../db/model.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

const signup = async (req, res) => {
    try {
        const { firstname, lastname, username, email, password } = req.body;
        console.log(firstname, lastname, username, email, password);
        
        // Check if all fields are provided
        if (!firstname || !lastname || !username || !email || !password) {
            return res.status(400).send("Please complete all fields");
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).send("User already exists");
        }

        // Hash the password
        const hashedPwd = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = await User.create({
            firstname,
            lastname,
            email,
            username,
            password: hashedPwd,
        });
        await newUser.save();
        // Send success response
        res.status(201).send({ success: true, message: "User is successfully created" });
    } catch (error) {
        console.error("There is some internal error:", error);
        res.status(500).send("Internal server error");
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).send("Kindly fill fields");
        }
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).send("User does not exist");
        }
        const userid = user._id;
        console.log(userid);
        const ispasswordValid = await bcrypt.compare(password, user.password);
        if (!ispasswordValid) {
            return res.status(400).send("Invalid password");
        }
        const token = await jwt.sign({ id: user._id }, process.env.secret_key, { expiresIn: '1d' });
        console.log("Generated Token:", token); // Log the generated token

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', 
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        }).status(201).send({ success: true, message: "User logged in successfully", token}); // Include token in response

    } catch (error) {
        console.error("There is some internal error:", error);
        res.status(500).send("Internal server error");
    }
};

const logout = async (req, res) => {
    try {
        res.clearCookie("access_token").status(200).send({ success: true, message: "User logged out successfully" });
    } catch (error) {
        console.error("There is some internal error:", error);
        res.status(500).send("Internal server error");
    }
};

const getUserData = async (req, res) => {
    const userId = req.params.id; // Ensure this is correctly set
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).send("Invalid user ID");
    }
    const data = await User.findById(userId); // Use findById to fetch user
    if (!data) {
        return res.status(404).send("User not found");
    }
    res.status(200).send(data);
};

const updateUser = async (req, res) => {
    const userId = req.params.id; // Ensure this is correctly set
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).send("Invalid user ID");
        }
        const user = await User.findByIdAndUpdate(userId, req.body, { new: true });
        if (!user) {
            return res.status(404).send("User not found");
            }
            res.status(200).send(user);
  };

           

export { login, signup, logout, getUserData, updateUser }; // Include updateUser in exports
 