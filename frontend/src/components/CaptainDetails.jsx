import { Clock, GaugeCircle, Wallet, Star } from 'lucide-react';

const CaptainDetails = ({ captain, setSearchForPassenger }) => {
    return (
        <div className="h-[340px] w-[375px] bg-white overflow-hidden relative">
            {/* Profile Section */}
            <div className="px-4 pt-4 pb-3">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <img
                            src={captain.imageUrl || 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop'}
                            alt={captain.fullName.firstName}
                            className="w-12 h-12 rounded-full object-cover border-2 border-green-500"
                        />
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                                    {`${captain.fullName.firstName} ${captain.fullName.lastName}`}
                                    <span className="flex items-center text-yellow-500 text-sm">
                                        <Star className="w-4 h-4 fill-current" />
                                        <span className="ml-0.5 text-gray-900">4.9</span>
                                    </span>
                                </h2>
                                <p className="text-xs text-gray-500">Professional Driver</p>
                            </div>
                            <div className="text-right">
                                <p className="text-lg font-bold text-green-500">$234.30</p>
                                <p className="text-xs text-gray-500">Today</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="px-4 py-3 border-t border-gray-100">
                <div className="grid grid-cols-3 gap-3">
                    <div className="bg-gray-50 rounded-lg p-2">
                        <div className="flex flex-col items-center">
                            <Clock className="w-5 h-5 text-green-500" />
                            <span className="text-sm font-bold text-gray-900 mt-1">10.2</span>
                            <span className="text-[10px] text-gray-500">Hours</span>
                        </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2">
                        <div className="flex flex-col items-center">
                            <GaugeCircle className="w-5 h-5 text-green-500" />
                            <span className="text-sm font-bold text-gray-900 mt-1">567</span>
                            <span className="text-[10px] text-gray-500">KM</span>
                        </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2">
                        <div className="flex flex-col items-center">
                            <Wallet className="w-5 h-5 text-green-500" />
                            <span className="text-sm font-bold text-gray-900 mt-1">23</span>
                            <span className="text-[10px] text-gray-500">Trips</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Today's Summary - More Compact */}
            <div className="px-4 py-3 border-t border-gray-100">
                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-xs text-gray-500">Success Rate</p>
                                <p className="text-base font-bold text-green-500">98%</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-gray-500">Distance</p>
                                <p className="text-base font-bold text-gray-900">567km</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-xs text-gray-500">Fuel Used</p>
                                <p className="text-base font-bold text-gray-900">45L</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-gray-500">Earnings/km</p>
                                <p className="text-base font-bold text-green-500">$0.41</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Button */}
            <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-white border-t border-gray-100">
                <button
                    onClick={() => setSearchForPassenger(true)}
                    className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold
                             shadow-lg shadow-green-500/20 hover:bg-green-600 
                             active:transform active:scale-[0.98] transition-all"
                >
                    Search for Rides
                </button>
            </div>
        </div>
    );
};

export default CaptainDetails;