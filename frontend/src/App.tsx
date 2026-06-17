import { Outlet } from 'react-router';
import { Toaster } from 'sonner';

const App = () => {
  return (
    <>
      <main className="font-poppins relative bg-background w-screen min-h-screen flex items-center justify-center bg-no-repeat bg-center bg-cover">
        <Outlet />
      </main>
      <Toaster position="top-center" />
    </>
  );
};

export default App;
