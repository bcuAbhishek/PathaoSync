import Captain from '../models/captain.model.js';
import validator from 'validator';
import bcrypt from 'bcrypt';
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js';

export const createCaptain = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            phone,
            color,
            plate,
            capacity,
            type,
        } = req.body;

        // Check for required fields
        if (
            !firstName ||
            !email ||
            !password ||
            !phone ||
            !color ||
            !plate ||
            !capacity ||
            !type
        ) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Validate email
        const existingCaptain = await Captain.findOne({ email });

        if (existingCaptain) {
            return res.status(400).json({ message: 'Captain already exists' });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: 'Invalid email' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new captain with initial null location
        const newCaptain = await Captain.create({
            fullName: {
                firstName,
                lastName,
            },
            email,
            password: hashedPassword,
            phone,
            vehicle: {
                color,
                plate,
                capacity,
                type,
            },
            location: {
                type: 'Point',
                coordinates: [0, 0], // Initialize with null values
            },
        });

        // Return response
        return res.status(201).json({
            message: 'Captain created successfully',
            captain: newCaptain,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
};

export const loginCaptain = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ message: 'All fields are required' });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: 'Invalid email' });
        }

        const captain = await Captain.findOne({ email });

        if (!captain) {
            return res.status(400).json({ message: 'Captain not found' });
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            captain.password
        );

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid Passwords' });
        }

        generateTokenAndSetCookie(captain._id, res);

        return res.status(200).json({ message: 'Captain Login successful' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
};

export const getMeCaptain = async (req, res) => {
    try {
        const captainId = req.user._id;

        const captain = await Captain.findById(captainId);
        return res.status(200).json(captain);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
};

export const logoutCaptain = async (req, res) => {
    try {
        res.clearCookie('token');
        return res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
};
