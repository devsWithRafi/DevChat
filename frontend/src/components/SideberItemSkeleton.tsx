import { Skeleton } from './ui/skeleton';

const SideberItemSkeleton = () => {
    return [...Array(10)].map((_, idx) => (
        <div
            key={idx}
            className="flex items-center gap-4 py-2 px-5 w-full cursor-pointer"
        >
            <Skeleton className="min-w-9 h-9 rounded-full" />
            <div className="w-full flex flex-col gap-0.5">
                <Skeleton className="w-full h-4 rounded-full" />
                <Skeleton className="w-[80%] h-4 rounded-full" />
            </div>
        </div>
    ));
};

export default SideberItemSkeleton;
