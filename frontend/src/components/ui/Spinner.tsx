import { cn } from '../../lib/utils';

const Spinner = ({ className, ...props }: { className?: string }) => {
    return (
        <div
            className={cn(
                'rounded-full w-6 h-6 border-[3px] border-zinc-200 border-t-zinc-500 relative flex items-center justify-center animate-spin',
                className,
            )}
            {...props}
        />
    );
};

export default Spinner;
