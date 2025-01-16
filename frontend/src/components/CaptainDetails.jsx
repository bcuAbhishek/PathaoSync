import { FaMoneyCheckAlt } from 'react-icons/fa';
import { IoSpeedometerSharp, IoTime } from 'react-icons/io5';

const CaptainDetails = ({ setRidePopUpPanel, captain }) => {
    return (
        <div>
            <div className='flex justify-between items-center'>
                <div className='flex gap-4 items-center'>
                    <img
                        src=''
                        alt=''
                        className='size-10 bg-black rounded-full'
                    />
                    <h3 className='font-semibold text-xl'>{`${captain.fullName.firstName} ${captain.fullName.lastName}`}</h3>
                </div>
                <div className='flex flex-col gap-1'>
                    <span className='text-xl font-semibold'>$234.30</span>
                    <span>Earned</span>
                </div>
            </div>

            <div className='flex justify-between p-2 items-center bg-slate-100 rounded-lg'>
                <div className='flex flex-col  items-center gap-1 text-center'>
                    <IoTime className='size-6' />
                    <span className='font-medium'>10.2</span>
                    <span className='text-sm font-light'>Hours Online</span>
                </div>
                <div className='flex flex-col  items-center gap-1 text-center'>
                    <IoSpeedometerSharp className='size-6' />
                    <span className='font-medium'>567 km</span>
                    <span className='text-sm font-light'>
                        Distance Traveled
                    </span>
                </div>
                <div className='flex flex-col  items-center gap-1 text-center'>
                    <FaMoneyCheckAlt className='size-6' />
                    <span className='font-medium'>567 km</span>
                    <span className='text-sm font-light'>
                        Distance Traveled
                    </span>
                </div>
            </div>
            <div
                onClick={() => setRidePopUpPanel(true)}
                className='bg-green-500 text-white p-4 mt-4 rounded-lg cursor-pointer'
            >
                Search for Rides
            </div>
        </div>
    );
};

export default CaptainDetails;
