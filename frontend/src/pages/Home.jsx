import { useContext, useEffect, useRef, useState } from 'react';
import SearchLocation from '../components/SearchLocation';
import { gsap } from 'gsap';
import VehicleChoosePanel from '../components/VehicleChoosePanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useAuthUser } from '../utils/GetMe';
import { SocketContext } from '../context/SocketContext';
import CaptainConfirmedPanel from '../components/CaptainConfirmedPanel';
import LiveTracking from '../components/LiveTracking';
import Logout from '../utils/Logout';
import RideOnGoing from '../components/RideOnGoing';

const Home = ({ setExactLocation }) => {
    const [PanelOpen, setPanelOpen] = useState(false);
    const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
    const [confirmRideOpen, setConfirmRideOpen] = useState(false);
    const [vehicleFound, setVehicleFound] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [pickupInput, setPickupInput] = useState('');
    const [destinationInput, setDestinationInput] = useState('');
    const [vehiclePrice, setVehiclePrice] = useState({});
    const [captainConfirmedPanel, setCaptainConfirmedPanel] = useState(false);
    const [rideOngoing, setRideOngoing] = useState(false);
    const [finishPayment, setFinishPayment] = useState(false);

    const PanelRef = useRef(null);
    const vehiclePanelRef = useRef(null);
    const confirmRideRef = useRef(null);
    const lookingForDriverRef = useRef(null);
    const captainConfirmedRef = useRef(null);
    const rideOngoingRef = useRef(null);
    const finishPaymentRef = useRef(null);

    useEffect(() => {
        gsap.to(PanelRef.current, {
            height: PanelOpen ? '100%' : '40%',
        });
    }, [PanelOpen]);

    useEffect(() => {
        gsap.to(vehiclePanelRef.current, {
            height: vehiclePanelOpen ? 'auto' : '0%',
        });
    }, [vehiclePanelOpen]);

    useEffect(() => {
        gsap.to(confirmRideRef.current, {
            height: confirmRideOpen ? 'auto' : '0%',
        });
    }, [confirmRideOpen]);

    useEffect(() => {
        gsap.to(rideOngoingRef.current, {
            height: rideOngoing ? 'auto' : '0%',
        });
    }, [rideOngoing]);

    useEffect(() => {
        gsap.to(finishPaymentRef.current, {
            height: finishPayment ? 'auto' : '0%',
        });
    }, [finishPayment]);

    useEffect(() => {
        if (captainConfirmedPanel) {
            gsap.to(captainConfirmedRef.current, {
                height: 'auto',
                duration: 0.5, // Smooth animation
                ease: 'power2.out',
            });
        } else {
            gsap.to(captainConfirmedRef.current, {
                height: '0%',
                duration: 0.5,
                ease: 'power2.in',
            });
        }
    }, [captainConfirmedPanel]); // Trigger animation when captainConfirmedPanel changes

    const { sendMessage, receiveMessage } = useContext(SocketContext);

    const { authUser } = useAuthUser();

    const [confirmedCaptainData, setConfirmedCaptainData] = useState({});

    useEffect(() => {
        sendMessage('join', { userType: 'user', userId: authUser._id });

        receiveMessage('ride-accepted', (data) => {
            setVehicleFound(false);
            setConfirmedCaptainData(data);
            setCaptainConfirmedPanel(true);
        });
    }, [receiveMessage, sendMessage, authUser._id]);

    const [ongoingRideData, setOngoingRideData] = useState({});

    useEffect(() => {
        receiveMessage('ride-started', (data) => {
            setOngoingRideData(data);
            setRideOngoing(true);
        });
    });

    // Query to fetch vehicle prices
    const { refetch } = useQuery({
        queryKey: ['get-fare', pickupInput, destinationInput],
        queryFn: async () => {
            const formData = {
                pickup: pickupInput,
                destination: destinationInput,
            };
            const response = await axios.post('/api/ride/get-fare', formData);
            return response.data;
        },
        enabled: false, // Disable automatic fetching
    });

    // Mutation to find a trip

    const { mutate: findTrip } = useMutation({
        mutationFn: async () => {
            const formData = {
                pickup: pickupInput,
                destination: destinationInput,
                vehicleType: selectedVehicle.type,
            };
            const response = await axios.post(
                '/api/ride/create-ride',
                formData
            );
            console.log(`ride created: ${response.data}`);
            return response.data;
        },
        onSuccess: (data) => {
            setVehicleFound(data);
            setConfirmRideOpen(true);
        },
        onError: (error) => {
            console.error('Error finding trip:', error.message);
            toast.error('Error finding trip');
        },
    });

    const confirmRide = () => {
        findTrip();
    };

    const handleVehiclePrice = async () => {
        if (!pickupInput || !destinationInput) {
            toast.error('Please enter both pickup and destination locations.');
            return;
        }

        // Trigger the query manually
        const { data } = await refetch();

        if (data) {
            setVehiclePrice(data);
        } else {
            toast.error('Error fetching vehicle price');
        }
    };

    return (
        <div className='h-[667px] w-[375px] relative bg-gray-50 overflow-hidden'>
            <div className='absolute top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm'>
                <div className='flex justify-between items-center px-4 py-3'>
                    <h2 className='text-xl font-bold text-gray-900'>
                        PathaoSync
                    </h2>
                    <Logout />
                </div>
            </div>

            <div className='absolute inset-0 pt-[52px]'>
                <LiveTracking setExactLocation={setExactLocation} />
            </div>

            <div ref={PanelRef} className='absolute bottom-0 w-full bg-white'>
                <SearchLocation
                    PanelOpen={PanelOpen}
                    setPanelOpen={setPanelOpen}
                    setVehiclePanelOpen={setVehiclePanelOpen}
                    pickupInput={pickupInput}
                    setPickupInput={setPickupInput}
                    destinationInput={destinationInput}
                    setDestinationInput={setDestinationInput}
                    handleVehiclePrice={handleVehiclePrice}
                />
            </div>
            <div
                className='w-full absolute bottom-0 bg-white'
                ref={vehiclePanelRef}
            >
                <VehicleChoosePanel
                    vehiclePanelOpen={vehiclePanelOpen}
                    setVehiclePanelOpen={setVehiclePanelOpen}
                    setConfirmRideOpen={setConfirmRideOpen}
                    vehiclePrice={vehiclePrice}
                    setSelectedVehicle={setSelectedVehicle}
                    selectedVehicle={selectedVehicle}
                />
            </div>
            <div
                className='w-full absolute bottom-0 bg-white'
                ref={confirmRideRef}
            >
                <ConfirmRide
                    vehicleFound={vehicleFound}
                    setVehicleFound={setVehicleFound}
                    setConfirmRideOpen={setConfirmRideOpen}
                    pickupInput={pickupInput}
                    destinationInput={destinationInput}
                    vehiclePrice={vehiclePrice}
                    setSelectedVehicle={setSelectedVehicle}
                    selectedVehicle={selectedVehicle}
                    confirmRide={confirmRide}
                />
            </div>
            <div
                className='w-full absolute bottom-0 bg-white'
                ref={lookingForDriverRef}
            >
                <LookingForDriver
                    vehicleFound={vehicleFound}
                    setVehicleFound={setVehicleFound}
                />
            </div>
            <div className='w-full absolute bottom-0'>
                {captainConfirmedPanel && (
                    <div ref={captainConfirmedRef}>
                        <CaptainConfirmedPanel
                            confirmedCaptainData={confirmedCaptainData}
                        />
                    </div>
                )}
            </div>

            <div className='w-full absolute bottom-0' ref={rideOngoingRef}>
                <RideOnGoing
                    ongoingRideData={ongoingRideData}
                    setFinishPayment={setFinishPayment}
                />
            </div>
        </div>
    );
};

export default Home;
