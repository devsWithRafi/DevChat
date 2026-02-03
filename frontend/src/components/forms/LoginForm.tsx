import { useState, type ChangeEvent, type FormEvent } from 'react';
import ShowPassword from '../ShowPassword';
import LoginWithSocials from './LoginWithSocials';
import { Link, useNavigate } from 'react-router';
import Spinner from '../ui/Spinner';
import { MdArrowForwardIos } from 'react-icons/md';
import useLogin from '../../hooks/useLogin';
import toast from 'react-hot-toast';
import { cn } from '../../lib/utils';

const LoginForm = () => {
    const initialInputValue = { email: '', password: '' };
    const [inputValue, setInputValue] = useState(initialInputValue);
    const navigate = useNavigate();

    const [showPass, setShowPass] = useState<boolean>(false);
    const { loading, handleLogin, error } = useLogin();

    const inputProps = (name: string, type?: string) => {
        return {
            type: type ?? 'text',
            name,
            value: inputValue[name as keyof typeof initialInputValue],
            onChange: (e: ChangeEvent<HTMLInputElement>) =>
                setInputValue((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                })),
            className:
                'border border-white/20 rounded-lg font-normal focus:border-white/50 duration-300 text-sm outline-0 h-11 w-full px-5',
        };
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const success = await handleLogin(inputValue);
        if (success) {
            toast.success('Login successful!');
            navigate('/');
        } else {
            toast.error(error || "Login failed!");
            return;
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className={cn(
                'flex flex-col items-center justify-center w-full p-10 gap-5',
                loading && 'pointer-events-none opacity-[0.5] select-none',
            )}
        >
            <div className="text-center mb-5">
                <h1 className="font-bold text-xl">Sign in you account</h1>
                <p className="font-space text-sm text-zinc-400">
                    Welcome back! Please sign in to continue
                </p>
            </div>
            <input
                {...inputProps('email')}
                placeholder="Email Adress"
                required
            />
            <div className="w-full flex items-center justify-center relative">
                <input
                    {...inputProps(
                        'password',
                        `${showPass ? 'text' : 'password'}`,
                    )}
                    placeholder="Password"
                    required
                    minLength={6}
                />
                <ShowPassword showPass={showPass} setShowPass={setShowPass} />
            </div>
            {/* SIGNUP WITH GOOGLE/GITHUB */}
            <div className="w-full flex items-center justify-between mt-5">
                <span className="w-full h-[1px] bg-white/15" />
                <span className="px-5">Or</span>
                <span className="w-full h-[1px] bg-white/15" />
            </div>
            <LoginWithSocials />
            {/* SUBMIT BUTTON */}
            <button
                type="submit"
                className="bg-white text-black font-medium mt-5 w-full rounded-lg h-11 cursor-pointer flex items-center justify-center gap-2 text-md"
            >
                {!loading && (
                    <>
                        <p>Continue</p>
                        <MdArrowForwardIos />
                    </>
                )}
                {loading && (
                    <>
                        <Spinner className="w-5 h-5 border-[2.5px]" />
                        <p className="text-zinc-500">Processing...</p>
                    </>
                )}
            </button>
            {/* ALREADY HAVE AN ACCOUNT ? */}
            <h3 className="text-sm text-zinc-400">
                Don’t have an account?
                <Link to="/signup" className="text-white hover:underline">
                    {'  Sign up'}
                </Link>
            </h3>
        </form>
    );
};

export default LoginForm;
