import { useState, type Dispatch, type FormEvent, type SetStateAction } from 'react';
import Portal from '../Portal';
import useCurrentUser from '../../hooks/useCurrentUser';
import { MdOutlineCameraAlt } from "react-icons/md";
import defaultAvater from '../../assets/default-avater/default-male-avater.png';
import useEditProfileInfo from '../../hooks/useEditProfileInfo';
import toast from 'react-hot-toast';
import Spinner from '../ui/Spinner';
import { cn } from '../../lib/utils';

interface EditProfileModalProps {
    setOnEditClick: Dispatch<SetStateAction<boolean>>;
}

const EditProfileModal = ({ setOnEditClick }: EditProfileModalProps) => {
    const { currentUser } = useCurrentUser();
    const {loading, error, handleEditProfileInfo} = useEditProfileInfo();
    const [inputValues, setInputValues] = useState({
        name: currentUser.name,
        bio: currentUser.bio || 'No bio yet',
    })
    const [avaterFile, setAvaterFile] = useState<File | null>(null);
    const avaterImagePreview = avaterFile ? URL.createObjectURL(avaterFile) : null;

    const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const success = await handleEditProfileInfo({
            name:inputValues.name, 
            bio:inputValues.bio, 
            avaterFile
        })
        if(success) { 
            toast.success('Profile updated successfully');
            setOnEditClick(false)
            return
        }
        toast.error(error || 'Failed to update profile');
    }


    return (
        <Portal onClose={setOnEditClick}>
            <section className="w-200 bg-white/15 border border-white/15 p-7 rounded-xl flex flex-col shadow-2xl max-[825px]:w-[95vw]">
                <p className='font-space text-gray-300'>Edit profile details</p>
                <div className='flex gap-7 w-full mt-5 items-start max-[825px]:flex-col max-[825px]:items-center'>
                    <div className="min-w-55 max-w-55 max-[500px]:w-full max-[500px]:min-w-full aspect-square overflow-hidden relative cursor-pointer group">
                        <img
                            src={(avaterImagePreview || currentUser.avater || defaultAvater)}
                            className="w-full h-full aspect-square"
                        />
                        <label htmlFor="avaterFile" className='absolute duration-300 bg-black/20 flex items-center justify-center text-[25px] cursor-pointer text-white top-0 left-0 right-0 bottom-0 h-full w-full'>
                              <MdOutlineCameraAlt/>
                        </label>
                        <input type="file" accept='image/*' onChange={(e) => setAvaterFile(e.target.files && e.target.files[0])} id='avaterFile' className='hidden'/>
                    </div>
                    <form 
                       onSubmit={handleOnSubmit}
                       className="flex flex-col w-full gap-1">
                        <label className="font-medium">Full Name</label>
                        <input
                            type="text"
                            required
                            value={inputValues.name}
                            onChange={(e) => setInputValues(prev => ({...prev, name: e.target.value}))}
                            placeholder="Full Name"
                            className="border border-white/30 rounded p-2.5 px-5 outline-0 w-full text-sm"
                        />
                        <label className="font-medium mt-3">Bio</label>
                        <input
                            type="text"
                            required
                            value={inputValues.bio}
                            onChange={(e) => setInputValues(prev => ({...prev, bio: e.target.value}))}
                            placeholder="Profile bio"
                            className="border border-white/30 rounded p-2.5 px-5 outline-0 w-full text-sm"
                        />
                        <button
                            type="submit"
                            className={cn("bg-white w-full text-black p-2 rounded-full mt-5 font-medium text-md cursor-pointer hover:bg-gray-100 flex items-center justify-center gap-2")}
                        >
                            {loading 
                                ?<Spinner className='border-2 h-5 w-5'/> 
                                :'Save' }        
                        </button>
                    </form>
                </div>
            </section>
        </Portal>
    );
};

export default EditProfileModal;
