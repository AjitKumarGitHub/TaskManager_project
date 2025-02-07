import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,  
        required: true,
         
        trim: true
    },
    lastname: {
        type: String, 
        required: true,
        trim: true
    },
    username: {
        type: String,  
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String, 
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String, 
        required: true,
        trim: true,
        minlength: 6,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

// Create the User model
const User = mongoose.model("User ", userSchema);
export default User;