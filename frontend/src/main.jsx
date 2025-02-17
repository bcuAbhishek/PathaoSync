import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SocketProvider } from './context/SocketContext';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false,
        },
    },
});

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <SocketProvider>
                    <App />
                    <Toaster
                        position='top-center'
                        containerStyle={{
                            maxWidth: '375px',
                            margin: '0 auto',
                        }}
                    />
                </SocketProvider>
            </QueryClientProvider>
        </BrowserRouter>
    </StrictMode>
);
