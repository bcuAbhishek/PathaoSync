# 🚗 Ride Hailing Application (PathaoSync)

<video src="./frontend/public/PathaoSync.mp4" alt="PathaoSync Demo" width="800"/>

A full-stack ride-hailing application that connects riders with nearby drivers, similar to Uber/Ola. The application provides real-time location tracking, ride matching, and fare calculation.

## ✨ Features

-   🗺️ Real-time location tracking using Google Maps API
-   🔐 User and Driver (Captain) authentication
-   💰 Ride booking and fare calculation
-   ⚡ Real-time ride status updates
-   🔍 Location search with autocomplete
-   🔢 OTP verification for ride start
-   🚘 Multiple vehicle types (Car, Motorcycle, Auto)
-   📍 Live driver tracking
-   🔄 Socket-based real-time communication

## 🛠️ Tech Stack

### Backend

-   📦 Node.js
-   🚀 Express.js
-   🍃 MongoDB (with Mongoose)
-   🔌 Socket.IO
-   🔑 JWT Authentication
-   🗺️ Google Maps API Integration
-   🔒 Bcrypt for password hashing
-   ✅ Express Validator
-   🌐 CORS

### Frontend

-   ⚛️ React (v19)
-   🔄 React Router DOM (v7)
-   💅 TailwindCSS
-   ✨ GSAP for animations
-   🔄 React Query (Tanstack Query)
-   🔌 Socket.IO Client
-   📡 Axios
-   🔔 React Hot Toast
-   🎨 Lucide React Icons
-   🗺️ Google Maps React Components

## 📁 Project Structure

```bash
├── backend/
│   ├── controllers/   # Request handlers
│   ├── models/        # Database models
│   ├── routes/        # API routes
│   ├── services/      # Business logic
│   ├── utils/         # Helper functions
│   └── server.js      # Entry point
└── frontend/
    ├── src/
    │   ├── components/  # Reusable UI components
    │   ├── pages/       # Page components
    │   ├── utils/       # Helper functions
    │   └── App.jsx      # Root component
```

## 🔧 How It Works

### Backend Architecture

-   🚀 RESTful API built with Express.js
-   🗄️ MongoDB database with Mongoose ODM
-   🔌 Socket.IO for real-time communication
-   🔐 JWT-based authentication
-   🗺️ Google Maps API integration for:
    -   📍 Location geocoding
    -   📏 Distance calculation
    -   🛣️ Route optimization
    -   🔍 Place autocomplete

### Frontend Architecture

-   ⚛️ React-based SPA
-   📍 Real-time location tracking
-   🗺️ Interactive map interface
-   📱 Responsive design with TailwindCSS
-   🔄 State management with React Query
-   🔌 Socket.IO for real-time updates

## 🚀 Getting Started

1. Clone the repository

```bash
git clone [repository-url]
```

2. Install dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd frontend
npm install
```

3. Environment Setup
   Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
GOOGLE_MAPS_API=your_google_maps_api_key
```

4. Run the application

```bash
# Run backend
cd backend
npm start

# Run frontend
cd frontend
npm run dev
```

## 🔗 API Endpoints

### 🔐 Authentication

-   `POST /api/auth/register` - Register new user
-   `POST /api/auth/login` - User login
-   `POST /api/captain/register` - Register new captain
-   `POST /api/captain/login` - Captain login

### 🚗 Rides

-   `POST /api/ride/create-ride` - Create new ride
-   `POST /api/ride/get-fare` - Calculate ride fare
-   `POST /api/ride/confirm-ride` - Confirm ride
-   `POST /api/ride/start-ride` - Start ride

### 🗺️ Maps

-   `GET /api/maps/get-coordinates` - Get location coordinates
-   `GET /api/maps/get-distance-matrix` - Calculate distance and time
-   `GET /api/maps/get-suggestion` - Get location suggestions

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
