import { Outlet } from 'react-router';
import { Toaster } from 'react-hot-toast';
import bgImage from './assets/background.jpg';

const App = () => {
    return (
        <>
            <main
                className="font-poppins relative bg-black text-white w-screen min-h-screen flex items-center justify-center bg-no-repeat bg-center bg-cover"
                style={{ backgroundImage: `url(${bgImage})` }}
            >
                <Outlet />
            </main>
            <Toaster position="top-center" reverseOrder={false} />
        </>
    );
};

export default App;
