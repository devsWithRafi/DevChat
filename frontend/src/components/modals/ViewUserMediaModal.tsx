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
            <div className='grid grid-cols-4 gap-5 p-5 w-[70vw] h-[80vh] mx-auto overflow-y-auto bg-gray-900 rounded-lg'>
                {data.map((item) => (
                    <img key={item.id} src={item.image!} alt="" className='w-full rounded'/>
                ))}
            </div>
        </Portal>
    );
};

export default ViewUserMediaModal;
