import { RiSendPlaneLine } from 'react-icons/ri';
import { LuImage } from 'react-icons/lu';
import { useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import Navber from './Navber';
import { cn } from '../lib/utils';
import Spinner from './ui/Spinner';
import useSendMessage from '../hooks/useSendMessage';
import toast from 'react-hot-toast';
import AllMessages from './AllMessages';
import { useSearchParams } from 'react-router';

const ChatBox = () => {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [textMsg, setTextMsg] = useState<string>('');
    const { loading, error, handleSendMessage } = useSendMessage();
    const [searchParams] = useSearchParams();
    const selectedUserId = searchParams.get('userid');

    const sendButtonDesabled = !imageFile && !textMsg;

    const handleSend = async () => {
        if (!selectedUserId) {
            toast.error('Please select user for sending message!');
            return;
        }
        if (!sendButtonDesabled) {
            const success = await handleSendMessage({ imageFile, textMsg });

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

    return (
        <section className="w-full px-8 p-2 relative">
            {/* HEADER */}
            <Navber />
            {/* MESSAGE BOX */}
            <AllMessages />
            <section className="absolute bottom-0 left-0 right-0 p-5 flex flex-col gap-3">
                <section
                    className={cn(
                        'w-full flex items-center justify-between gap-3',
                        imageFile && 'items-end',
                    )}
                >
                    {/* text message */}
                    <div
                        className={cn(
                            'flex flex-col gap-5 w-full items-center bg-white/10 rounded-full h-12 px-6 justify-center',
                            imageFile &&
                                'rounded-[20px] justify-start h-auto p-6 items-start',
                        )}
                    >
                        {imageFile && (
                            <div className="flex gap-4 relative">
                                <img
                                    src={URL.createObjectURL(imageFile)}
                                    className="w-50"
                                />
                                <button
                                    onClick={() => setImageFile(null)}
                                    type="button"
                                    className="absolute right-1 top-1 text-[20px] cursor-pointer bg-white text-black hover:bg-red-500 hover:text-white duration-300 rounded-full p-1"
                                >
                                    <RxCross2 />
                                </button>
                            </div>
                        )}
                        <div className="relative w-full flex items-center justify-between gap-5">
                            <input
                                type="text"
                                placeholder="Send a message"
                                value={textMsg}
                                onChange={(e) => setTextMsg(e.target.value)}
                                className="text-sm w-full h-full outline-0 border-0"
                            />
                            <label
                                htmlFor="imageFileInput"
                                className="cursor-pointer text-zinc-400"
                            >
                                <LuImage size={20} />
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
                            setImageFile(e.target.files && e.target.files[0])
                        }
                    />
                    <button
                        type="button"
                        onClick={handleSend}
                        className={cn(
                            'min-w-11 h-11 cursor-pointer rounded-full flex items-center justify-center bg-gradient-to-r from-violet-500 to-purple-500',
                            sendButtonDesabled &&
                                'bg-white/20 pointer-events-none select-none opacity-[0.7]',
                            loading &&
                                'bg-white/20 pointer-events-none select-none opacity-[0.7]',
                        )}
                    >
                        {!loading ? (
                            <RiSendPlaneLine size={22} />
                        ) : (
                            <Spinner className="border-2 border-zinc-400 border-t-white" />
                        )}
                    </button>
                </section>
            </section>
        </section>
    );
};

export default ChatBox;
