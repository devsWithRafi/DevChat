import type { Dispatch, SetStateAction } from 'react';
import Portal from '../Portal';
import type { MessageType } from '../../types/Types';

interface ViewUserMediaModalProps {
    onClose: Dispatch<SetStateAction<boolean>>;
    data: MessageType[];
}

const ViewUserMediaModal = ({ onClose, data }: ViewUserMediaModalProps) => {
    return (
        <Portal onClose={onClose}>
            <div className="grid grid-cols-4 p-5 w-350 h-[80vh] mx-auto overflow-y-auto bg-gray-900 rounded-lg 
                    max-[1430px]:w-250 
                    max-[1028px]:w-200 
                    max-[1028px]:grid-cols-3"
            >
                {data.map((item) => (
                    <div key={item.id} className='w-full aspect-[2/1.3] overflow-hidden flex items-start justify-start'>
                        <img src={item.image!} alt="" className="w-full" />
                    </div>
                ))}
            </div>
        </Portal>
    );
};

export default ViewUserMediaModal;
