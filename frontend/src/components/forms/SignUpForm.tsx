import { useState, type ChangeEvent, type FormEvent } from 'react';
import ShowPassword from '../ShowPassword';
import LoginWithSocials from './LoginWithSocials';
import { MdArrowForwardIos } from 'react-icons/md';
import { Link, useNavigate } from 'react-router';
import useSignUp from '../../hooks/useSignUp';
import Spinner from '../ui/Spinner';
import toast from 'react-hot-toast';
import { cn } from '../../lib/utils';

const SignUpForm = () => {
    const [showPass, setShowPass] = useState<boolean>(false);
    const { loading, handleSignUp, error } = useSignUp();

    const initialInputValue = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    };
    const [inputValue, setInputValue] = useState(initialInputValue);
    const navigate = useNavigate();

    const inputProps = (name: string, type?: string) => {
        return {
            type: type ?? 'text',
            name,
            required: true,
            value: inputValue[name as keyof typeof initialInputValue],
            onChange: (e: ChangeEvent<HTMLInputElement>) =>
                setInputValue((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                })),
            className:
                'border border-white/20 rounded-lg font-normal focus:border-white/50 duration-300 text-sm outline-0 min-h-11 max-[540px]:min-h-9 max-[540px]:rounded-sm max-[540px]:px-3.5 max-[540px]:text-xs w-full px-5',
        };
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const success = await handleSignUp(inputValue);

        if (success) {
            toast.success('Sign Up Successful!');
            navigate('/login');
        } else {
            toast.error(error || 'SignUp failed!');
            return;
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className={cn(
                'flex flex-col items-center justify-center w-full max-[540px]:h-full p-10 max-[540px]:p-5 gap-5 max-[540px]:gap-2',
                loading && 'pointer-events-none opacity-[0.5] select-none',
            )}
        >
            <div className="text-center mb-5">
                <h1 className="font-bold text-xl">Create your account</h1>
                <p className="font-space text-sm text-zinc-400">
                    Welcome! Please fill in the details to get started.
                </p>
            </div>
            <div className="flex gap-5 max-[540px]:flex-col max-[540px]:gap-2 items-center justify-between w-full">
                <input
                    {...inputProps('firstName')}
                    placeholder="First Name"
                    required
                />
                <input {...inputProps('lastName')} placeholder="Last Name" />
            </div>
            <input {...inputProps('email')} placeholder="Email Adress" />
            <div className="w-full flex items-center justify-center relative">
                <input
                    {...inputProps(
                        'password',
                        `${showPass ? 'text' : 'password'}`,
                    )}
                    placeholder="Password"
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
                className="bg-white hover:bg-zinc-200 duration-300 text-black font-medium mt-5 w-full rounded-lg min-h-11 max-[540px]:min-h-9 rounded-sm cursor-pointer flex items-center justify-center gap-2 text-md"
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
                Already have an account?
                <Link to="/login" className="text-white hover:underline">
                    {'  Sign in'}
                </Link>
            </h3>
        </form>
    );
};

export default SignUpForm;
