import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const generateTokenAndSetCookie = (userId, res) => {
    const jwtToken = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });

    res.cookie('token', jwtToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
        sameSite: 'strict',
    });

    return jwtToken;
};
