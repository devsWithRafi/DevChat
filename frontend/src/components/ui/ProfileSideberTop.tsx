import { cn } from '../../lib/utils';

interface ProfileSideberTopProps {
  avaterImage: string;
  online?: boolean | null | '';
  name: string;
  bio?: string;
  type?: 'chat' | 'group';
}

const ProfileSideberTop = ({
  avaterImage,
  online,
  name,
  bio,
  type = 'chat',
}: ProfileSideberTopProps) => {
  return (
    <div className="w-full flex flex-col items-center text-center py-5">
      <div className="w-20 aspect-square mt-10 relative">
        <img
          src={avaterImage}
          className={cn(
            'w-full aspect-square object-cover',
            type === 'chat' ? 'rounded-full' : 'rounded-xl',
          )}
        />
        {online && (
          <span className="bg-green-400 size-5 aspect-square border-[3.5px] border-background rounded-full absolute bottom-1 right-0" />
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
