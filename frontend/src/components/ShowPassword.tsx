import { type Dispatch, type SetStateAction } from 'react';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
interface ShowPasswordProps {
    showPass: boolean;
    setShowPass: Dispatch<SetStateAction<boolean>>;
}
const ShowPassword = ({ showPass, setShowPass, ...props }: ShowPasswordProps) => {
    return (
        <div className='absolute right-3 flex items-center justify-center' {...props}>
            {!showPass ? (
                <IoEyeOutline
                    onClick={() => setShowPass((prev) => !prev)}
                    className="text-[17px] cursor-pointer text-zinc-400 duration-300 hover:text-white hover:scale-[1.1]"
                />
            ) : (
                <IoEyeOffOutline
                    onClick={() => setShowPass((prev) => !prev)}
                    className="text-[17px] cursor-pointer text-zinc-400 duration-300 hover:text-white hover:scale-[1.1]"
                />
            )}
        </div>
    );
};

export default ShowPassword;
