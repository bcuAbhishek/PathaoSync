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

const Home = () => {
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

    const PanelRef = useRef(null);
    const vehiclePanelRef = useRef(null);
    const confirmRideRef = useRef(null);
    const lookingForDriverRef = useRef(null);
    const captainConfirmedRef = useRef(null);
    const rideOngoingRef = useRef(null);

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
    });

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
        <>
            <div className='flex flex-col h-screen overflow-y-hidden relative'>
                <div className='flex justify-between items-center text-white p-1'>
                    <h2 className='text-2xl font-bold text-black'>
                        Sasta Pathao
                    </h2>
                    <Logout />
                </div>

                <div>
                    <LiveTracking />
                </div>

                <div
                    ref={PanelRef}
                    className='absolute bottom-0 w-full bg-white'
                >
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
                <div
                    className={`w-full absolute bottom-0 ${
                        captainConfirmedPanel ? 'visible' : 'hidden'
                    }`}
                    ref={captainConfirmedRef}
                >
                    <CaptainConfirmedPanel
                        confirmedCaptainData={confirmedCaptainData}
                        // confirmCaptainAndSendOtp={confirmCaptainAndSendOtp}
                    />
                </div>
                <div className='w-full absolute bottom-0' ref={rideOngoingRef}>
                    <RideOnGoing ongoingRideData={ongoingRideData} />
                </div>
            </div>
        </>
    );
};

export default Home;
