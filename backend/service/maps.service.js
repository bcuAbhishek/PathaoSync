import axios from 'axios';

export const getAddressCoordinate = async (address) => {
    const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API;

    try {
        const response = await axios.get(
            'https://maps.googleapis.com/maps/api/geocode/json',
            {
                params: {
                    address: address,
                    key: GOOGLE_MAPS_API_KEY,
                },
            }
        );

        if (response.data.status === 'OK') {
            const location = response.data.results[0].geometry.location;
            return {
                lat: location.lat,
                lng: location.lng,
            };
        } else {
            throw new Error('Unable to fetch coordinates');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getDistanceMatrixService = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }

    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
        origin
    )}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            const element = response.data.rows[0].elements[0];
            if (element.status === 'ZERO_RESULTS') {
                throw new Error('No routes found');
            }
            return element;
        } else {
            throw new Error(response.data.error_message || 'API Error');
        }
    } catch (error) {
        console.error('Google API Error:', error.message);
        throw new Error(error.response?.data?.error_message || error.message);
    }
};

export const getAutoCompleteSuggestionService = async (input) => {
    if (!input) {
        throw new Error('Input is required');
    }

    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            return response.data.predictions;
        } else {
            throw new Error(response.data.error_message || 'API Error');
        }
    } catch (error) {
        console.error('Google API Error:', error.message);
        throw new Error(error.response?.data?.error_message || error.message);
    }
};
