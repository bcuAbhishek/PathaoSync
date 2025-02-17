const config = {
    mongoURI: process.env.MONGO_URI,
    jwtSecret: process.env.JWT_SECRET,
    googleMapsAPI: process.env.GOOGLE_MAPS_API,
    clientURL: process.env.NODE_ENV === 'production' 
        ? 'https://pathaosync.onrender.com' 
        : 'http://localhost:5173'
};

export default config; 