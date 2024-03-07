import { validationResult } from "express-validator";
import User from "../models/userModel.js";
import bcrypt from 'bcrypt';

const createUser = async(req, res) => {
    const { username, email, password } = req.body;
    
    // if username, email and password are not empty
    if(!username || !password || !email) {
        res.status(400).json({ error: 'username, email and password required' });
    }

    const result = validationResult(req); // it contains validation errors
    
    if(!result.isEmpty()) {
        res.status(400).json({ error: result});
        return;
    }
    const userExist = await User.findOne({email});
    // checking if user already exists
    if(userExist) {
        res.status(400).json({ error: 'User already exist' });
    } else {
        // creating user
        await User.create({
            username,
            email,
            password: await hashPassword(password)
        });
        res.status(200).json({ username, email });
    }
}

const login = async(req, res) => {
    const { email, password } = req.body;
    if(!email || !password) {
        res.status(400).json({ error: 'email and password required' });
    }
    const user = await User.findOne({email}); // finding user through email from database

    // checking if email and password matches
    if(user && (await user.checkPassword(password))) {
        res.status(200).json({ message: 'loggedin successfully' });
    } else {
        res.status(401).json({ error: 'Incorrect email or password' });
    }
}

const updateUser = async(req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, {
            username: req.body.username,
            email: req.body.email,
            password: await hashPassword(req.body.password)
        }, {
            new: true
        })
        user && res.status(200).json( { success: 'User updated successfully' } );
    } catch (error) {
        res.status(404).json({ error: 'user not found '+error });
    }
}

// hashing password
const hashPassword = async function(password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

export {
    createUser,
    login,
    updateUser,
}