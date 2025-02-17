import React from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Start from './pages/Start';
import Home from './pages/Home';
import CaptainHome from './pages/CaptainHome';
import { useAuthUser, useCaptainAuthUser } from './utils/GetMe';
import { useEffect, useState } from 'react';

function App() {
    const { authUser, isLoading } = useAuthUser();
    const { captainAuthUser, captainIsLoading } = useCaptainAuthUser();
    const navigate = useNavigate();
    const location = useLocation();
    const [exactLocation, setExactLocation] = useState('');

    useEffect(() => {
        if (authUser) {
            if (location.pathname !== '/home') {
                navigate('/home');
            }
        } else if (captainAuthUser) {
            if (location.pathname !== '/chome') {
                navigate('/chome');
            }
        } else {
            if (
                location.pathname !== '/login' &&
                location.pathname !== '/register' &&
                location.pathname !== '/'
            ) {
                navigate('/');
            }
        }
    }, [authUser, captainAuthUser, location.pathname, navigate]);

    if (isLoading || captainIsLoading) {
        return (
            <div className='h-[667px] w-[375px] flex items-center justify-center bg-gray-50'>
                <div className='w-5 h-5 border-2 border-green-500 border-t-transparent rounded-full animate-spin' />
            </div>
        );
    }

    return (
        <div className='h-[667px] w-[375px] bg-gray-50 overflow-hidden'>
            <Routes>
                {authUser ? (
                    <Route path='/home' element={<Home />} />
                ) : captainAuthUser ? (
                    <Route
                        path='/chome'
                        element={
                            <CaptainHome
                                setExactLocation={setExactLocation}
                                exactLocation={exactLocation}
                            />
                        }
                    />
                ) : (
                    <>
                        <Route path='/' element={<Start />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/register' element={<Register />} />
                    </>
                )}
            </Routes>
        </div>
    );
}

export default App;
