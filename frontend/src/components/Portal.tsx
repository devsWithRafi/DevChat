import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
    children: ReactNode;
    onClose: Dispatch<SetStateAction<boolean>>;
}

const Portal = ({ children, onClose }: PortalProps) => {
    return createPortal(
        <section
            onClick={() => onClose(prev => !prev)}
            className="fixed text-white font-poppins w-screen h-screen flex items-center justify-center p-5 left-0 right-0 bottom-0 top-0 bg-black/30 backdrop-blur-[3px] z-99"
        >
            <div onClick={(e) => e.stopPropagation()}>{children}</div>
        </section>,
        document.body,
    );
};

export default Portal;
