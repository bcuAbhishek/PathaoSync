import mongoose from 'mongoose';

const captainSchema = new mongoose.Schema({
    fullName: {
        firstName: {
            type: String,
            required: true,
            minlength: 3,
        },
        lastName: {
            type: String,
            minlength: 3,
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    phone: {
        type: String,
        required: true,
        minlength: 10,
    },
    socketId: {
        type: String,
    },
    status: {
        type: String,
        enum: ['online', 'offline'],
        default: 'offline',
    },
    vehicle: {
        color: {
            type: String,
            required: true,
        },
        plate: {
            type: String,
            required: true,
        },
        capacity: {
            type: Number,
            required: true,
            min: 1,
        },
        type: {
            type: String,
            enum: ['car', 'motorcycle', 'auto'],
            required: true,
        },
    },
    location: {
        latitude: {
            type: Number,
        },
        longitude: {
            type: Number,
        },
    }
});

const Captain = mongoose.model('Captain', captainSchema);

export default Captain;
