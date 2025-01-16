import { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io('http://localhost:5000'); // Replace with your server URL
        setSocket(newSocket);

        newSocket.on('connect', () => {
            console.log('Connected to server');
        });

        newSocket.on('disconnect', () => {
            console.log('Disconnected from server');
        });

        return () => newSocket.close();
    }, []);

    const sendMessage = (eventName, message) => {
        if (socket) {
            socket.emit(eventName, message);
        }
    };

    const receiveMessage = (eventName, callback) => {
        if (socket) {
            socket.on(eventName, callback);
        }
    };

    return (
        <SocketContext.Provider value={{ sendMessage, receiveMessage }}>
            {children}
        </SocketContext.Provider>
    );
};
