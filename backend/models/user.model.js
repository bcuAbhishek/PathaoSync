import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    fullName: {
        firstName: {
            type: String,
            required: true,
            trim: true,
            minlenght: [2, 'First name must be at least 2 characters long'],
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
            minlenght: [2, 'Last name must be at least 2 characters long'],
        },
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
    },
    socketId: {
        type: String,
    },
});

const User = mongoose.model('User', userSchema);

export default User;
