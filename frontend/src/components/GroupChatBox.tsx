import { RiSendPlaneLine } from 'react-icons/ri';
import { LuImage } from 'react-icons/lu';
import { useState, type FormEvent } from 'react';
import { RxCross2 } from 'react-icons/rx';
import Navber from './Navber';
import { cn } from '../lib/utils';
import Spinner from './ui/Spinner';
import toast from 'react-hot-toast';
import { useSearchParams } from 'react-router';
import AllGroupMessages from './AllGroupMessages';
import useSendGroupMessage from '../hooks/useSendGroupMessage';
import useFetchGroups from '../hooks/useFetchGroups';
import useCurrentUser from '../hooks/useCurrentUser';
import useAddNewMemberIntoGroup from '../hooks/useAddNewMember';

const GroupChatBox = () => {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [textMsg, setTextMsg] = useState<string>('');
    const { isSending, error, handleSendGroupMessage } = useSendGroupMessage();
    const [searchParams] = useSearchParams();
    const selectedGroupId = searchParams.get('groupid');
    const { groups } = useFetchGroups();
    const { currentUser } = useCurrentUser();
    const findGroup = groups.find((g) => g.id === selectedGroupId);
    const {fetchGroups} = useFetchGroups()

    const {
        loading,
        error: addMerror,
        handleAddNewMember,
    } = useAddNewMemberIntoGroup();

    const sendButtonDesabled = !imageFile && !textMsg;
    const isUserInGroup = findGroup?.members.some(
        (m) => m.id === currentUser?.id,
    );

    const handleSend = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!selectedGroupId) {
            return toast.error('Please select a group for sending message!');
        }

        if (!isUserInGroup) {
            return toast.error(
                'Sorry you are not allow to send message in this group',
            );
        }
        if (!sendButtonDesabled) {
            const success = await handleSendGroupMessage({
                imageFile,
                textMsg,
            });

            if (!success) {
                toast.error(error);
                return;
            } else {
                setImageFile(null);
                setTextMsg('');
                return;
            }
        }
    };

    const handleJoinGroup = async () => {
        const success = await handleAddNewMember(selectedGroupId!);
        if (success) {
            fetchGroups()
            toast.success('Joining group success!');
            return;
        } else {
            toast.error(addMerror || 'Joining group failed!');
            return;
        }
    };

    return (
        <section
            className={cn(
                'w-full px-8 p-2 relative h-full max-[767px]:px-3',
                `max-[767px]:${!selectedGroupId ? 'hidden' : ''}`,
            )}
        >
            {/* HEADER */}
            <Navber navType="group" />
            {/* MESSAGE BOX */}
            <AllGroupMessages />
            {/* message input */}
            <section className="absolute bottom-0 left-0 right-0 p-5 flex flex-col gap-3 max-[767px]:p-3">
                {isUserInGroup ? (
                    <form
                        onSubmit={handleSend}
                        className={cn(
                            'w-full flex items-center justify-between gap-3',
                            imageFile && 'items-end',
                        )}
                    >
                        {/* text message */}
                        <div
                            className={cn(
                                'flex flex-col gap-5 w-full items-center bg-white/10 rounded-full h-12 px-6 justify-center max-[767px]:px-4.5 max-[767px]:h-9',
                                imageFile &&
                                    'rounded-[20px] max-[767px]:rounded-[10px] justify-start h-auto p-6 max-[767px]:p-4.5 items-start max-[767px]:h-auto',
                            )}
                        >
                            {imageFile && (
                                <div className="flex gap-4 relative">
                                    <img
                                        src={URL.createObjectURL(imageFile)}
                                        className="w-50 max-[767px]:w-30"
                                    />
                                    <button
                                        onClick={() => setImageFile(null)}
                                        type="button"
                                        className="absolute right-1 top-1 cursor-pointer bg-white text-black hover:bg-red-500 hover:text-white duration-300 rounded-full p-1"
                                    >
                                        <RxCross2 className="text-[20px] max-[767px]:text-[15px]" />
                                    </button>
                                </div>
                            )}
                            <div className="relative w-full flex items-center justify-between gap-5">
                                <input
                                    type="text"
                                    placeholder="Send a message"
                                    value={textMsg}
                                    onChange={(e) => setTextMsg(e.target.value)}
                                    className="text-sm w-full h-full outline-0 border-0 max-[767px]:text-[12px]"
                                />
                                <label
                                    htmlFor="imageFileInput"
                                    className="cursor-pointer text-zinc-400"
                                >
                                    <LuImage className="text-[20px] max-[767px]:text-[15px]" />
                                </label>
                            </div>
                        </div>

                        {/* image */}
                        <input
                            type="file"
                            accept="image/*"
                            id="imageFileInput"
                            className="hidden"
                            onChange={(e) =>
                                setImageFile(
                                    e.target.files && e.target.files[0],
                                )
                            }
                        />
                        <button
                            type="submit"
                            className={cn(
                                'min-w-11 h-11 cursor-pointer rounded-full flex items-center justify-center bg-gradient-to-r from-violet-500 to-purple-500 max-[767px]:min-w-8 max-[767px]:h-8',
                                sendButtonDesabled &&
                                    'bg-white/20 pointer-events-none select-none opacity-[0.7]',
                                isSending &&
                                    'bg-white/20 pointer-events-none select-none opacity-[0.7]',
                            )}
                        >
                            {!isSending ? (
                                <RiSendPlaneLine className="text-[22px] max-[767px]:text-[15px]" />
                            ) : (
                                <Spinner className="border-2 border-zinc-400 border-t-white" />
                            )}
                        </button>
                    </form>
                ) : (
                    <button 
                        type='button'
                        onClick={handleJoinGroup}
                        className="w-full rounded-full bg-gradient-to-r from-slate-500 to-slate-800
                    p-2.5 cursor-pointer text-sm flex items-center justify-center"
                    >
                        {!loading ? "Join Group" : <Spinner/>}
                    </button>
                )}
            </section>
        </section>
    );
};

export default GroupChatBox;
