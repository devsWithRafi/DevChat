import { useSearchParams } from 'react-router';
import ChatBox from '../components/ChatBox';
import ProfileSidebar from '../components/ProfileSidebar';
import Sideber from '../components/Sideber';
import logo from '../assets/logo.png';
import useCurrentUser from '../hooks/useCurrentUser';
import SignUpForm from '../components/forms/SignUpForm';

const HomePage = () => {
    const [searchParams] = useSearchParams();
    const selectedUserId = searchParams.get('userid');
    const { currentUser } = useCurrentUser();

    return (
        <section className="bg-black/5 w-[70%] max-h-[85vh] h-[85vh] rounded-2xl overflow-hidden backdrop-blur-[20px] z-1 border border-white/20 flex">
            {currentUser ? (
                <Sideber className={`${!selectedUserId && 'w-full'}`} />
            ) : (
                <SignUpForm />
            )}

            {currentUser && selectedUserId ? (
                <>
                    <ChatBox />
                    <ProfileSidebar />
                </>
            ) : (
                <div className="w-full bg-white/15 flex flex-col items-center justify-center">
                    <img src={logo} alt="" className="w-70" />
                    <h2>Chat anytime, anywhere</h2>
                </div>
            )}
        </section>
    );
};

export default HomePage;
