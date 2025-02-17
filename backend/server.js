import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import http from 'http';

import connectDB from './db/connectDB.js';

import userRoutes from './routes/user.routes.js';
import captainRoutes from './routes/captain.routes.js';
import mapsRoutes from './routes/maps.routes.js';
import rideRoutes from './routes/ride.routes.js';
import { initializeSocket } from './socket.js';

dotenv.config();

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin:
            process.env.NODE_ENV === 'production'
                ? ['https://pathaosync.onrender.com']
                : ['http://localhost:5173'],
        credentials: true,
    })
);

app.use('/api/auth', userRoutes);
app.use('/api/captain', captainRoutes);
app.use('/api/maps', mapsRoutes);
app.use('/api/ride', rideRoutes);

const port = process.env.PORT || 5000;

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Serve at http://localhost:${port}`);
    connectDB();
    initializeSocket(server);
});
