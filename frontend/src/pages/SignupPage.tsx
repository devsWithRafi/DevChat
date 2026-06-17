import { SignUp } from '@clerk/react';

const SignupPage = () => {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center backdrop-blur-xl">
      <SignUp />
    </div>
  );
};

export default SignupPage;
