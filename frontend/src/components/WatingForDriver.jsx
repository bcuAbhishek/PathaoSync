const WatingForDriver = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-2">Meet the Driver at just shown circle</h3>
                <span className="text-gray-500 mb-4">2min</span>
                <div className="flex items-center">
                    <img className="w-16 h-16 rounded-full mr-4" src='' alt='driver profile' />
                    <img className="w-16 h-16 rounded-lg mr-4" src='' alt='car image' />
                    <div>
                        <h3 className="text-lg font-semibold">Driver Name</h3>
                        <span className="text-gray-500">Driver Rating</span>
                        <span className="block text-gray-500">336BA NP</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WatingForDriver;
