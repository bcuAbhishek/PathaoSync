import {
    getAddressCoordinate,
    getAutoCompleteSuggestionService,
    getDistanceMatrixService,
} from '../service/maps.service.js';

export const getCoordinates = async (req, res) => {
    try {
        const address = req.query.address;
        const coordinates = await getAddressCoordinate(address);
        return res
            .status(200)
            .json(
                `The coordinates for ${address} are: ${JSON.stringify(
                    coordinates
                )}`
            );
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getDistanceMatrix = async (req, res) => {
    try {
        const { origin, destination } = req.query;

        if (!origin || !destination) {
            return res
                .status(400)
                .json({ message: 'Origin and destination are required' });
        }

        const distanceTime = await getDistanceMatrixService(
            origin,
            destination
        );
        return res.status(200).json(distanceTime);
    } catch (error) {
        console.error('Error:', error.message);
        return res.status(500).json({ message: error.message });
    }
};

export const getAutoCompleteSuggestion = async (req, res) => {
    try {
        const input = req.query.input;
        if (!input) {
            return res.status(400).json({ message: 'Input is required' });
        }
        const suggestions = await getAutoCompleteSuggestionService(input);
        return res.status(200).json(suggestions);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};
