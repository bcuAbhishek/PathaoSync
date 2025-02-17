import { useState, useEffect } from 'react';
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '500px',
};

const LiveTracking = ({ setExactLocation }) => {
    const [currentPosition, setCurrentPosition] = useState({ lat: 0, lng: 0 });

    useEffect(() => {
        const fetchPosition = () => {
            if (!navigator.geolocation) {
                console.error('Geolocation is not supported by this browser.');
                return;
            }

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const newPosition = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    setCurrentPosition(newPosition);
                    console.log(newPosition);

                    // Fetch the exact address from Google Maps API
                    fetchExactLocation(newPosition);
                },
                (error) => {
                    if (error.code === 1) {
                        alert(
                            'Location permission is denied. Please enable it in your browser settings.'
                        );
                    } else if (error.code === 2) {
                        console.error('Location unavailable.');
                    } else if (error.code === 3) {
                        console.error('Location request timed out.');
                    } else {
                        console.error('Geolocation error:', error);
                    }
                },
                { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
            );
        };

        // Function to fetch the exact address using Google Maps Geocoding API
        const fetchExactLocation = async ({ lat, lng }) => {
            try {
                const response = await fetch(
                    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${
                        import.meta.env.VITE_GOOGLE_MAPS_API
                    }`
                );
                const data = await response.json();

                if (data.results && data.results.length > 0) {
                    const exactAddress = data.results[0].formatted_address;
                    setExactLocation(exactAddress);
                } else {
                    console.error('No location found');
                }
            } catch (error) {
                console.error('Error fetching exact location:', error);
            }
        };

        fetchPosition(); // Fetch initial position

        const intervalId = setInterval(fetchPosition, 5000); // Refetch every 5 seconds

        return () => clearInterval(intervalId); // Cleanup on component unmount
    }, [setExactLocation]);

    return (
        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API}>
            <GoogleMap
                key={`${currentPosition.lat}-${currentPosition.lng}`} // Force re-render when position changes
                mapContainerStyle={containerStyle}
                center={currentPosition}
                zoom={17}
            >
                <Marker position={currentPosition} />
            </GoogleMap>
        </LoadScript>
    );
};

export default LiveTracking;
