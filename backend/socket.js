import { Server } from 'socket.io';
import User from './models/user.model.js';
import Captain from './models/captain.model.js';

let io;

export const initializeSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
        },
    });

    io.on('connection', (socket) => {
        // console.log(`New client connected: ${socket.id}`);

        socket.on('join', async (data) => {
            const { userId, userType } = data;

            console.log(`User ${userId} joined as ${userType}`);
            try {
                if (userType === 'user') {
                    await User.findByIdAndUpdate(userId, {
                        socketId: socket.id,
                    });
                } else if (userType === 'captain') {
                    await Captain.findByIdAndUpdate(userId, {
                        socketId: socket.id,
                    });
                }
                // console.log(
                //     `Socket ID ${socket.id} stored for ${userType} ${userId}`
                // );
            } catch (error) {
                console.error(
                    `Error storing socket ID for ${userType} ${userId}:`,
                    error
                );
            }
        });

        socket.on(
            'update-captain-location',
            async ({ captainId, location }) => {
                if (!location || !location.latitude || !location.longitude) {
                    return socket.emit(
                        'error',
                        'Location with latitude and longitude is required'
                    );
                }

                try {
                    // Update the location with longitude and latitude in the correct order [longitude, latitude]
                    await Captain.findByIdAndUpdate(captainId, {
                        location: {
                            type: 'Point', // Ensuring the type is "Point"
                            coordinates: [
                                location.longitude,
                                location.latitude,
                            ], // Set as [longitude, latitude]
                        },
                    });
                    console.log(`Captain ${captainId} location updated`);
                } catch (error) {
                    console.error(
                        `Error updating captain ${captainId} location:`,
                        error
                    );
                    socket.emit('error', 'Error updating captain location');
                }
            }
        );

        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
};

export const sendMessageToSocketId = (socketId, message) => {
    console.log(`Sending message to ${socketId}:`, message);
    if (io) {
        
        try {
            if (!socketId) throw new Error('Socket ID is missing');
            if (!io) throw new Error('Socket.IO instance is not initialized');
        
            io.to(socketId).emit(message.event, message.data);
        } catch (error) {
            console.error('Error sending message:', error.message);
        }
        
    } else {
        console.error('Socket.io is not initialized');
    }
};
