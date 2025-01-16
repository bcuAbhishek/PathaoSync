import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Start from './pages/Start';
import Home from './pages/Home';
import CaptainHome from './pages/CaptainHome';
import { useAuthUser, useCaptainAuthUser } from './utils/GetMe';
import { useEffect } from 'react';

const App = () => {
    const { authUser, isLoading } = useAuthUser();
    const { captainAuthUser, captainIsLoading } = useCaptainAuthUser();
    const navigate = useNavigate();
    const location = useLocation();

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
        return <div>Loading...</div>;
    }

    return (
        <Routes>
            {authUser ? (
                <Route path='/home' element={<Home />} />
            ) : captainAuthUser ? (
                <Route path='/chome' element={<CaptainHome />} />
            ) : (
                <>
                    <Route path='/' element={<Start />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                </>
            )}
        </Routes>
    );
};

export default App;
