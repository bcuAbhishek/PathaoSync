import User from '../models/user.model.js';
import validator from 'validator';
import bcrypt from 'bcrypt';
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js';

export const createUser = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
        if (!firstName || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (firstName.length < 2) {
            return res
                .status(400)
                .json({
                    message: 'First name must be at least 2 characters long',
                });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: 'Invalid email' });
        }

        if (password.length < 6) {
            return res
                .status(400)
                .json({
                    message: 'Password must be at least 6 characters long',
                });
        }

        const emailExists = await User.findOne({ email });

        if (emailExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            fullName: { firstName, lastName },
            email,
            password: hashedPassword,
        });

        res.status(201).json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ message: 'All fields are required' });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        generateTokenAndSetCookie(user._id, res);
        return res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
};

export const getMe = async (req, res) => {
    try {
        const userId = req.user._id;

        const user = await User.findById(userId);
        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
};

export const logoutUser = async (req, res) => {
    try {
        res.clearCookie('token');
        return res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
};
