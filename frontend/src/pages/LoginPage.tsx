import loginSideImage from '../assets/login-form-side-image.png';
import Logo from '../assets/logo.png';
import LoginForm from '../components/forms/LoginForm';

const LoginPage = () => {
    return (
        <section className="bg-black/5 w-[60%] max-h-[80vh] h-[80vh] gap-5 rounded-2xl overflow-hidden backdrop-blur-[30px] z-1 border border-white/10 flex p-5">
            {/* LEFT SIDE */}
            <div className="relative min-w-[45%] max-w-[45%] overflow-hidden">
                <img
                    src={Logo}
                    alt=""
                    className="w-50 absolute z-1 left-2 top-2 select-none pointer-events-none"
                />
                <img
                    src={loginSideImage}
                    alt=""
                    className="w-full opacity-[0.7] select-none pointer-events-none"
                />
                <div className="z-1 text-white  absolute bottom-0 p-5 overflow-hidden">
                    <div className="bg-white/5 backdrop-blur-[50px] p-5 rounded-2xl border border-white/10 shadow-xl">
                        <h1 className="font-medium text-xl">Welcome back 👋</h1>
                        <p className="text-md font-space text-zinc-300">Sign in to DevMeet and continue connecting with developers.</p>
                    </div>
                </div>
            </div>
            {/* RIGHT SIDE */}
            <LoginForm />
        </section>
    );
};

export default LoginPage;
