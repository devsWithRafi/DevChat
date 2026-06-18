import { Link, useSearchParams } from 'react-router';
import ChatBox from '../components/ChatBox';
import ProfileSidebar from '../components/ProfileSidebar';
import Sideber from '../components/Sideber';
import logoWhite from '../assets/logo/Devchat-logo-white.png';
import logoBlack from '../assets/logo/Devchat-logo-black.png';
import GroupChatBox from '../components/GroupChatBox';
import { useUser } from '@clerk/react';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/@/components/ui/button';

const HomePage = () => {
  const [searchParams] = useSearchParams();
  const selectedUserId = searchParams.get('userid');
  const selectedGroupId = searchParams.get('groupid');
  const { user } = useUser();

  return (
    <section className="bg-background w-screen flex items-center justify-center h-screen sm:p-5">
      <div className="flex md:flex-row flex-col w-full h-full sm:rounded-2xl overflow-hidden z-1 sm:border">
        {user && (
          <Sideber
            className={`${!selectedUserId && !selectedGroupId && 'w-full'}`}
          />
        )}

        {user && (selectedUserId || selectedGroupId) ? (
          <>
            {selectedUserId && <ChatBox />}
            {selectedGroupId && <GroupChatBox />}
            <ProfileSidebar />
          </>
        ) : (
          <div className={cn("w-full bg-muted flex flex-col items-center justify-center h-full",
              user && 'max-[767px]:hidden'
          )}>
            <img src={logoWhite} alt="" className="w-70 dark:block hidden pointer-events-none select-none" />
            <img src={logoBlack} alt="" className="w-70 dark:hidden block pointer-events-none select-none" />
            <h2 className="font-medium text-muted-foreground">
              Chat anytime, anywhere
            </h2>
            {!user && <div className='flex items-center gap-2 mt-10'>
              <Link className={cn(buttonVariants({variant:"outline"}), "h-auto py-2.5 px-8 rounded-full")} to={'sign-up'}>Sign Up</Link>
              <Link className={cn(buttonVariants(), "h-auto py-2.5 px-8 rounded-full")} to={'sign-in'}>Login</Link>
            </div>}
          </div>
        )}
      </div>
    </section>
  );
};

export default HomePage;
