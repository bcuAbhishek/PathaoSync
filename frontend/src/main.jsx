import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SocketProvider } from './context/SocketContext';
import { DeviceFrameset } from 'react-device-frameset';
import 'react-device-frameset/styles/marvel-devices.min.css';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false,
        },
    },
});

createRoot(document.getElementById('root')).render(
    <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="transform scale-75"> {/* Adjust the scale here */}
            <DeviceFrameset device="iPhone X" color="gold">
                <BrowserRouter>
                    <QueryClientProvider client={queryClient}>
                        <SocketProvider>
                            <App />
                            <Toaster />
                        </SocketProvider>
                    </QueryClientProvider>
                </BrowserRouter>
            </DeviceFrameset>
        </div>
    </div>
);
