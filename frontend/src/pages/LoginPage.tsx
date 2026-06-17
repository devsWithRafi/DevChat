import { SignIn } from '@clerk/react';

const LoginPage = () => {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center backdrop-blur-xl">
      <SignIn />
    </div>
  );
};

export default LoginPage;
