import { cn } from '../../lib/utils';

interface ProfileSideberTopProps{
      avaterImage: string;
      online?: boolean | null | '';
      name: string;
      bio?: string;
}

const ProfileSideberTop = ({ avaterImage, online, name, bio }: ProfileSideberTopProps) => {
    return (
        <div className="w-full flex flex-col items-center text-center border-b border-white/20 py-5">
            <div className="w-20 rounded-full aspect-square mt-10 relative">
                <img
                    src={avaterImage}
                    className={cn('w-full aspect-square rounded-full')}
                />
                {online && (
                    // online indicator
                    <span className="bg-green-400 w-4 h-4 border-[3px] border-black rounded-full absolute bottom-2 right-0" />
                )}
            </div>
            <h2 className="font-semibold text-md mt-5">{name}</h2>
            <p className="font-normal text-sm font-space text-zinc-400">
                {bio?.slice(0, 60) || 'No bio yet'}
            </p>
        </div>
    );
};

export default ProfileSideberTop;
