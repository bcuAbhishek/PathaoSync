import User from '../models/user.model.js';
import validator from 'validator';
import bcrypt from 'bcrypt';
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js';

export const createUser = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
        if (!firstName || !email || !password) {
            res.status(400).json({ message: 'All fields are required' });
        }

        if (firstName.length < 2) {
            throw new Error('First name must be at least 2 characters long');
        }

        if (!validator.isEmail(email)) {
            throw new Error('Invalid email');
        }

        if (password.length < 6) {
            throw new Error('Password must be at least 6 characters long');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            fullName: { firstName, lastName },
            email,
            password: hashedPassword,
        });

        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
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
            throw new Error('User not found');
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new Error('Wrong Password');
        }

        generateTokenAndSetCookie(user._id, res);
        return res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const getMe = async (req, res) => {
    try {
        const userId = req.user._id;

        const user = await User.findById(userId);
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const logoutUser = async (req, res) => {
    try {
        res.clearCookie('token');
        return res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
