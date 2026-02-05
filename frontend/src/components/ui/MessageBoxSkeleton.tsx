import { cn } from '../../lib/utils';
import { Skeleton } from './skeleton';

interface MessageBoxSkeletonProps {
    position?: 'left' | 'right';
}

const MessageBoxSkeleton = ({ position = 'left' }: MessageBoxSkeletonProps) => {
    return (
        <section>
            <div className={cn("w-full flex flex-col items-start",
                  position === "right" && 'items-end'
            )}>
                <div className="max-w-90 w-90 max-[767px]:max-w-70 max-[767px]:w-70 flex flex-col">
                    {/* top */}
                    <div className={cn("bg-white/10 text-sm overflow-hidden rounded-[20px_20px_20px_0px] ml-5 p-2 relative",
                        position === "right" && 'rounded-[20px_20px_0px_20px] mr-5 ml-0'
                    )}>
                        <div className={cn("p-5 w-full flex flex-col gap-3 items-start max-[767px]:p-3",
                              position === "right" && 'items-end'
                        )}>
                            <Skeleton className="h-6 w-full rounded-full max-[767px]:h-4" />
                            <Skeleton className="h-6 w-[70%] rounded-full max-[767px]:h-4" />
                        </div>
                    </div>
                    {/* bottom */}
                    <div className={cn("flex items-start gap-3 py-3",
                        position === "right" && 'flex-row-reverse'
                    )}>
                        <Skeleton className="h-6 w-6 max-[767px]:h-5 max-[767px]:w-5 rounded-full" />
                        <p className="text-xs max-[767px]:text-[10px] text-zinc-500">00:00</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MessageBoxSkeleton;

