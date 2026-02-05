import { useSearchParams } from 'react-router';
import ChatBox from '../components/ChatBox';
import ProfileSidebar from '../components/ProfileSidebar';
import Sideber from '../components/Sideber';
import logo from '../assets/logo.png';
import useCurrentUser from '../hooks/useCurrentUser';
import SignUpForm from '../components/forms/SignUpForm';
import GroupChatBox from '../components/GroupChatBox';

const HomePage = () => {
    const [searchParams] = useSearchParams();
    const selectedUserId = searchParams.get('userid');
    const selectedGroupId = searchParams.get('groupid');
    const { currentUser } = useCurrentUser();

    return (
        <section className="bg-black/5 w-350 max-[1460px]:w-250 max-[1040px]:w-[95%] max-[767px]:w-110 
        max-h-[85vh] h-[85vh] max-[767px]:max-h-[90vh] max-[767px]:h-[90vh] max-[455px]:w-full max-[455px]:h-screen max-[455px]:min-h-screen rounded-2xl overflow-hidden backdrop-blur-[20px] z-1 border border-white/20 flex md:flex-row flex-col max-[455px]:rounded-none max-[455px]:border-0">
            {currentUser ? (
                <Sideber className={`${!selectedUserId && !selectedGroupId && 'w-full'}`} />
            ) : (
                <SignUpForm />
            )}

            {currentUser && (selectedUserId || selectedGroupId) ? (
                <>
                    {selectedUserId && <ChatBox />}
                    {selectedGroupId && <GroupChatBox />}
                    <ProfileSidebar />
                </>
            ) : (
                <div className="w-full bg-white/15 flex flex-col items-center justify-center max-[767px]:hidden">
                    <img src={logo} alt="" className="w-70" />
                    <h2>Chat anytime, anywhere</h2>
                </div>
            )}
        </section>
    );
};

export default HomePage;
