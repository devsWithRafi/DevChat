import { useState } from 'react';
import { cn } from '../../lib/utils';
import type { MessageType } from '../../types/Types';
import { Skeleton } from './skeleton';
import ViewUserMediaModal from '../modals/ViewUserMediaModal';
import useFetchGroups from '../../hooks/useFetchGroups';
import { useSearchParams } from 'react-router';
import defaultAvater from '../../assets/default-avater/default-male-avater.png';
import { buttonVariants } from '@/@/components/ui/button';

interface ProfileSideberTopProps {
  data: MessageType[];
  loading: boolean;
}

const ProfileSideberMedia = ({ data, loading }: ProfileSideberTopProps) => {
  const [viewMediaClick, setViewMediaClick] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<string>('media');
  const { groups } = useFetchGroups();
  const [searchParams] = useSearchParams();
  const selectedGroupId = searchParams.get('groupid');
  const findGroup = groups.find((g) => g.id === selectedGroupId);

  return (
    <section className="w-full py-2 h-full mt-2">
      <div className="flex items-center border-b">
        <button
          onClick={() => setSelectedTab('media')}
          className={cn(
            'text-left text-xs px-2 py-0.5 border-b border-transparent cursor-pointer text-muted-foreground duration-300',
            selectedTab === 'media' && 'border-primary text-primary',
          )}
        >
          Media
        </button>
        {selectedGroupId && (
          <button
            onClick={() => setSelectedTab('members')}
            className={cn(
              'text-left text-xs px-2 py-0.5 border-b border-transparent cursor-pointer text-muted-foreground duration-300',
              selectedTab === 'members' && 'border-primary text-primary',
            )}
          >
            Members
          </button>
        )}
      </div>

      {selectedTab === 'media' ? (
        <>
          {/* medias */}
          <div
            className={cn('grid grid-cols-2 gap-2', loading ? 'mt-0' : 'mt-5')}
          >
            {!loading &&
              data?.length > 0 &&
              data.slice(0, 4).map((item) => (
                <div
                  key={item.id}
                  className="w-full overflow-hidden rounded aspect-[2/1.2]"
                >
                  <img
                    src={item.image!}
                    className="w-full rounded min-h-full object-cover"
                  />
                </div>
              ))}
          </div>
          <div
            className={cn('grid grid-cols-2 gap-2', !loading ? 'mt-0' : 'mt-5')}
          >
            {loading &&
              [...Array(4)].map((_, index) => (
                <Skeleton
                  key={index}
                  className="w-full overflow-hidden aspect-[2/1.2]"
                ></Skeleton>
              ))}
          </div>
          {data?.length > 4 && (
            <>
              <button
                onClick={() => setViewMediaClick((prev) => !prev)}
                className="text-xs cursor-pointer hover:underline"
              >
                Viwe All
              </button>
              {viewMediaClick && (
                <ViewUserMediaModal data={data} onClose={setViewMediaClick} />
              )}
            </>
          )}
        </>
      ) : (
        // members
        <div className="h-[calc(100%-100px)] overflow-y-auto pb-10 py-5 flex flex-col gap-3">
          {findGroup?.members
            .slice()
            .sort((a, b) =>
              a.id === findGroup.admin.id
                ? -1
                : b.id === findGroup.admin.id
                  ? 1
                  : 0,
            )
            .map((user) => (
              <div key={user.id} className="flex items-center gap-3 w-full justify-between">
                <div className='w-full flex items-center gap-3'>
                  <div className="min-w-8 max-w-8 aspect-square rounded-full overflow-hidden">
                    <img
                      src={user.avatar || defaultAvater}
                      className="w-full h-full"
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <h2 className="text-[13px]">{user.name}</h2>
                    <h2 className="text-[10px] text-zinc-400 -mt-0.5 300 max-w-[90%] text-ellipsis whitespace-nowrap overflow-hidden">
                      {user.email || ''}
                    </h2>
                  </div>
                </div>
                {findGroup?.admin.id === user.id && (
                  <span
                    className={cn(
                      buttonVariants(),
                      'text-[11px] h-auto px-2 pointer-events-none rounded-full',
                    )}
                  >
                    Admin
                  </span>
                )}
              </div>
            ))}
        </div>
      )}
    </section>
  );
};

export default ProfileSideberMedia;
