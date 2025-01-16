import { useNavigate } from 'react-router-dom';
import start from '../assets/start.png';

const Start = () => {
    const navigate = useNavigate();

    return (
        <div
            style={{
                backgroundImage: `url(${start})`,
            }}
            className='bg-cover bg-center h-svh w-full flex flex-col items-center justify-between'
        >
            <h1 className='text-white text-3xl font-bold mt-8'>
                Welcome to <i>Sasta Pathao</i>
            </h1>
            <div className='bg-slate-500/30 w-full text-center p-12'>
                <button
                    onClick={() => navigate('/register')}
                    className='text-2xl font-semibold px-4 py-2 rounded-lg bg-slate-50'
                >
                    Get Started
                </button>
            </div>
        </div>
    );
};
export default Start;
