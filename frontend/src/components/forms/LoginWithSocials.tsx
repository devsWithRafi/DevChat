import { FaGithub, FaGoogle } from 'react-icons/fa';

interface LoginWithSocialsProps {
    onGoogleClick?: () => void;
    onGithubClick?: () => void;
}

const LoginWithSocials = ({
    onGoogleClick,
    onGithubClick,
}: LoginWithSocialsProps) => {
    return (
        <div className="w-full flex items-center gap-5 mt-5 max-[540px]:flex-col max-[540px]:gap-2 max-[540px]:mt-2">
            <button
                onClick={onGoogleClick}
                type="button"
                className="flex items-center gap-2 font-poppins border border-white/20 w-full h-11 max-[540px]:h-9 max-[540px]:rounded-sm max-[540px]:text-sm px-5 rounded-lg cursor-pointer duration-300 hover:border-white/40 hover:shadow-2xl/40 hover:shadow-purple-500"
            >
                <FaGoogle className="text-[18px] max-[540px]:text-[15px]" /> Google
            </button>
            <button
                onClick={onGithubClick}
                type="button"
                className="flex items-center gap-2 font-poppins border border-white/20 w-full h-11 max-[540px]:h-9 max-[540px]:rounded-sm max-[540px]:text-sm px-5 rounded-lg cursor-pointer duration-300 hover:border-white/40 hover:shadow-2xl/40 hover:shadow-purple-500"
            >
                <FaGithub className="text-[18px] max-[540px]:text-[15px]" /> GitHub
            </button>
        </div>
    );
};

export default LoginWithSocials;
