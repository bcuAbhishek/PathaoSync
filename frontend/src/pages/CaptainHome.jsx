import { useContext, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import axios from 'axios';
import CaptainDetails from '../components/CaptainDetails';
import RidePopUp from '../components/RidePopUp';
import ConfirmRidePopUp from '../components/ConfirmRidePopUp';
import RideOn from '../components/RideOn';
import FinishRide from '../components/FinishRide';
import { useCaptainAuthUser } from '../utils/GetMe';
import LoadingAnimation from '../utils/LoadingAnimation';
import { SocketContext } from '../context/SocketContext';
import LiveTracking from '../components/LiveTracking';
import SearchingForPassenger from '../components/SearchingForPassenger';
import Logout from '../utils/Logout';

const CaptainHome = ({ setExactLocation, exactLocation }) => {
    const [ridePopUpPanel, setRidePopUpPanel] = useState(false);
    const [confirmRideOfPassenger, setConfirmRideOfPassenger] = useState(false);
    const [rideOn, setRideOn] = useState(false);
    const [finishRide, setFinishRide] = useState(false);
    const [searchForPassenger, setSearchForPassenger] = useState(false);

    const ridePopUpPanelRef = useRef(null);
    const confirmRideOfPassengerRef = useRef(null);
    const rideOnRef = useRef(null);
    const finishRideRef = useRef(null);
    const searchForPassengerRef = useRef(null);

    const { captainAuthUser, isLoading } = useCaptainAuthUser();
    const captain = captainAuthUser;

    const { sendMessage, receiveMessage } = useContext(SocketContext);
    const [rideData, setRideData] = useState();

    // GSAP Animations
    const animatePanel = (ref, isOpen, duration = 0.5) => {
        const panel = ref.current;
        if (!panel) return;

        // Kill any existing tweens to prevent animation conflicts
        gsap.killTweensOf(panel);

        gsap.to(panel, {
            height: isOpen ? 'auto' : 0,
            duration,
            ease: 'power3.inOut',
            onStart: () => {
                if (isOpen) {
                    panel.style.display = 'block';
                }
            },
            onComplete: () => {
                if (!isOpen) {
                    panel.style.display = 'none';
                }
            },
        });
    };

    // Handle ride state changes
    useEffect(() => {
        if (rideOn) {
            setConfirmRideOfPassenger(false);
            setRidePopUpPanel(false);
        }
    }, [rideOn]);

    // Socket connection and location updates
    useEffect(() => {
        if (!captain?._id) return;

        sendMessage('join', { userType: 'captain', userId: captain._id });

        receiveMessage('new-ride', (data) => {
            setRideData(data);
            if (searchForPassenger && data) {
                setRidePopUpPanel(true);
            } else {
                setRidePopUpPanel(false);
            }
        });

        const updateLiveLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    const location = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    };
                    sendMessage('update-captain-location', {
                        captainId: captain._id,
                        location,
                    });
                });
            }
        };

        const locationInterval = setInterval(updateLiveLocation, 10000);
        updateLiveLocation(); // Initial update

        return () => clearInterval(locationInterval);
    }, [captain?._id, sendMessage, receiveMessage, searchForPassenger]);

    // Animate panels when their states change
    useEffect(() => {
        animatePanel(ridePopUpPanelRef, ridePopUpPanel);
        animatePanel(confirmRideOfPassengerRef, confirmRideOfPassenger);
        animatePanel(rideOnRef, rideOn);
        animatePanel(finishRideRef, finishRide);
        animatePanel(searchForPassengerRef, searchForPassenger);
    }, [
        ridePopUpPanel,
        confirmRideOfPassenger,
        rideOn,
        finishRide,
        searchForPassenger,
    ]);

    const confirmRide = async () => {
        try {
            await axios.post('/api/ride/confirm-ride', {
                rideId: rideData._id,
                captainId: captain._id,
            });
        } catch (error) {
            console.error('Error confirming ride:', error);
        }
    };

    if (isLoading) return <LoadingAnimation />;

    return (
        <div className='h-[667px] w-[375px] relative bg-gray-50 overflow-hidden'>
            {/* Header */}
            <div className='absolute top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm'>
                <div className='flex justify-between items-center px-4 py-3'>
                    <h2 className='text-xl font-bold text-gray-900'>
                        PathaoSync
                    </h2>
                    <Logout />
                </div>
            </div>

            {/* Map Container */}
            <div className='absolute inset-0 pt-[52px]'>
                <LiveTracking setExactLocation={setExactLocation} />
            </div>

            {/* Bottom Sheet Stack */}
            <div className='absolute bottom-0 left-0 right-0 z-40'>
                {/* Captain Details Panel */}
                <div className={`bg-white w-full ${rideOn ? 'hidden' : ''}`}>
                    <CaptainDetails
                        setSearchForPassenger={setSearchForPassenger}
                        captain={captain}
                    />
                </div>

                {/* Searching for Passenger Panel */}
                <div
                    ref={searchForPassengerRef}
                    className='w-full absolute bottom-0 bg-gradient-to-b from-green-50 to-white'
                    style={{ display: 'none' }}
                >
                    <SearchingForPassenger
                        setSearchForPassenger={setSearchForPassenger}
                        exactLocation={exactLocation}
                    />
                </div>

                {/* Ride Popup Panel */}
                <div
                    ref={ridePopUpPanelRef}
                    className='w-full absolute bottom-0'
                    style={{ display: 'none' }}
                >
                    {searchForPassenger && rideData && (
                        <RidePopUp
                            setRidePopUpPanel={setRidePopUpPanel}
                            setConfirmRideOfPassenger={
                                setConfirmRideOfPassenger
                            }
                            rideData={rideData}
                            confirmRide={confirmRide}
                        />
                    )}
                </div>

                {/* Confirm Ride Panel */}
                <div
                    ref={confirmRideOfPassengerRef}
                    className='w-full absolute bottom-0 bg-white'
                    style={{ display: 'none' }}
                >
                    <ConfirmRidePopUp
                        confirmRideOfPassenger={confirmRideOfPassenger}
                        setConfirmRideOfPassenger={setConfirmRideOfPassenger}
                        setRideOn={setRideOn}
                        rideData={rideData}
                    />
                </div>

                {/* Ride On Panel */}
                <div
                    ref={rideOnRef}
                    className='w-full absolute bottom-0'
                    style={{ display: 'none' }}
                >
                    <RideOn setFinishRide={setFinishRide} />
                </div>

                {/* Finish Ride Panel */}
                <div
                    ref={finishRideRef}
                    className='w-full absolute bottom-0 bg-white'
                    style={{ display: 'none' }}
                >
                    <FinishRide rideData={rideData} />
                </div>
            </div>
        </div>
    );
};

export default CaptainHome;
