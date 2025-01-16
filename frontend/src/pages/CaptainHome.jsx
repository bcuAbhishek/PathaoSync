import CaptainDetails from '../components/CaptainDetails';
import RidePopUp from '../components/RidePopUp';
import { useContext, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ConfirmRidePopUp from '../components/ConfirmRidePopUp';
import RideOn from '../components/RideOn';
import FinishRide from '../components/FinishRide';
import { useCaptainAuthUser } from '../utils/GetMe';
import LoadingAnimation from '../utils/LoadingAnimation';
import { SocketContext } from '../context/SocketContext';
import axios from 'axios';
import LiveTracking from '../components/LiveTracking';
import Logout from '../utils/Logout';

const CaptainHome = () => {
    const [ridePopUpPanel, setRidePopUpPanel] = useState(false);
    const [confirmRideOfPassenger, setConfirmRideOfPassenger] = useState(false);
    const [rideOn, setRideOn] = useState(false);
    const [finishRide, setFinishRide] = useState(false);

    const ridePopUpPanelRef = useRef(null);
    const confirmRideOfPassengerRef = useRef(null);
    const rideOnRef = useRef(null);
    const finishRideRef = useRef(null);

    const { captainAuthUser, isLoading } = useCaptainAuthUser();
    const captain = captainAuthUser;

    useEffect(() => {
        if (rideOn) {
            setConfirmRideOfPassenger(false);
            setRidePopUpPanel(false);
        }
    }, [rideOn]);

    const { sendMessage, receiveMessage } = useContext(SocketContext);

    const [rideData, setRideData] = useState();

    useEffect(() => {
        sendMessage('join', { userType: 'captain', userId: captain._id });

        receiveMessage('new-ride', (data) => {
            setRideData(data);
            setRidePopUpPanel(true);
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

            const updateLocationInterval = setTimeout(
                updateLiveLocation,
                10000
            );

            return () => clearTimeout(updateLocationInterval);
        };

        updateLiveLocation();
    }, [sendMessage, captain._id, rideData, receiveMessage]);

    const confirmRide = async () => {
        await axios.post('/api/ride/confirm-ride', {
            rideId: rideData._id,
            captainId: captain._id,
        });
    };

    const easeAnimation = (ref, panel) => {
        return gsap.to(ref.current, {
            y: panel ? 0 : '100%',
            duration: 0.5,
            ease: 'power3.inOut',
        });
    };

    useEffect(() => {
        easeAnimation(ridePopUpPanelRef, ridePopUpPanel);
        easeAnimation(confirmRideOfPassengerRef, confirmRideOfPassenger);
        easeAnimation(rideOnRef, rideOn);
        easeAnimation(finishRideRef, finishRide);
    }, [ridePopUpPanel, confirmRideOfPassenger, rideOn, finishRide]);

    if (isLoading) return <LoadingAnimation />;

    return (
        <div className='flex flex-col h-screen overflow-y-hidden relative'>
            <div className='flex justify-between items-center text-white p-1'>
                <h2 className='text-2xl font-bold text-black'>Sasta Pathao</h2>
                <Logout />
            </div>
            <div className='h-[70%]'>
                <div>
                    <LiveTracking />
                </div>
            </div>
            <div
                className={`bg-white p-4 w-full absolute bottom-0 ${
                    rideOn ? 'hidden' : ''
                }`}
            >
                <CaptainDetails
                    setRidePopUpPanel={setRidePopUpPanel}
                    captain={captain}
                />
            </div>
            <div ref={ridePopUpPanelRef} className='w-full absolute bottom-0'>
                <RidePopUp
                    setRidePopUpPanel={setRidePopUpPanel}
                    setConfirmRideOfPassenger={setConfirmRideOfPassenger}
                    rideData={rideData}
                    confirmRide={confirmRide}
                />
            </div>
            <div
                ref={confirmRideOfPassengerRef}
                className='w-full absolute bottom-0 bg-white'
            >
                <ConfirmRidePopUp
                    confirmRideOfPassenger={confirmRideOfPassenger}
                    setConfirmRideOfPassenger={setConfirmRideOfPassenger}
                    setRideOn={setRideOn}
                    rideData={rideData}
                />
            </div>

            <div ref={rideOnRef} className='w-full absolute bottom-0'>
                <RideOn setFinishRide={setFinishRide} />
            </div>

            <div
                ref={finishRideRef}
                className='w-full absolute bottom-0 bg-white'
            >
                <FinishRide rideData={rideData} />
            </div>
        </div>
    );
};

export default CaptainHome;
