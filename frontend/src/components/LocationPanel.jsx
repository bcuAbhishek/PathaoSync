import { FaLocationDot } from 'react-icons/fa6';

const LocationPanel = ({ suggestions, setInput, setSuggestions }) => {
    return (
        <div>
            <ul className='absolute bg-white w-full mt-1 rounded-lg z-10'>
                {suggestions.map((suggestion, index) => (
                    <li
                        key={index}
                        className='p-2 hover:bg-gray-200 cursor-pointer flex items-center gap-2'
                        onClick={() => {
                            setInput(suggestion.description); // Set input to the clicked suggestion
                            setSuggestions([]); // Clear suggestions
                        }}
                    >
                        <div className='p-2 rounded-full bg-gray-200 mr-2'>
                            <FaLocationDot />
                        </div>
                        {suggestion.description}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LocationPanel;
