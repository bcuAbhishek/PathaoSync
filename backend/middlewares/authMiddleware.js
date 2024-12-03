import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            throw new Error('Not authorized');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            throw new Error('Invalid token');
        }

        const user = await User.findById(decoded.id);
        if (!user) {
            throw new Error('User not found');
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: error.message });
    }
};
