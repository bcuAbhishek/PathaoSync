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

        const existingCaptain = await Captain.findOne({ email });

        if (existingCaptain) {
            return res.status(400).json({ message: 'Captain already exists' });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: 'Invalid email' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

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
        });

        return res.status(201).json({
            message: 'Captain created successfully',
            captain: newCaptain,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
};
