import { LuImage, LuLoader, LuSend } from 'react-icons/lu';
import { useState, type FormEvent } from 'react';
import { RxCross2 } from 'react-icons/rx';
import Navber from './Navber';
import { cn } from '../lib/utils';
import useSendMessage from '../hooks/useSendMessage';
import toast from 'react-hot-toast';
import AllMessages from './AllMessages';
import { useSearchParams } from 'react-router';
import { Button } from '@/@/components/ui/button';

const ChatBox = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [textMsg, setTextMsg] = useState<string>('');
  const { loading, error, handleSendMessage } = useSendMessage();
  const [searchParams] = useSearchParams();
  const selectedUserId = searchParams.get('userid');

  const sendButtonDesabled = !imageFile && !textMsg;

  const handleSend = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
    <section
      className={cn(
        'w-full relative h-full flex flex-col justify-between',
        `max-[767px]:${!selectedUserId ? 'hidden' : ''}`,
      )}
    >
      {/* HEADER */}
      <Navber navType="chat" />

      {/* MESSAGE BOX */}
      <AllMessages />

      <section className="p-5 pt-0 max-[767px]:p-2 flex flex-col gap-3 ">
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
              'flex flex-col gap-5 w-full items-center backdrop-blur-xl border rounded-full h-12 px-6 justify-center max-[767px]:px-4.5 max-[767px]:h-9',
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
                  className="absolute right-1 top-1 text-[20px] cursor-pointer bg-white text-black hover:bg-red-500 hover:text-white duration-300 rounded-full p-1"
                >
                  <RxCross2 />
                </button>
              </div>
            )}
            <div className="relative w-full flex items-center justify-between gap-5 max-[767px]:gap-2">
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
            onChange={(e) => setImageFile(e.target.files && e.target.files[0])}
          />
          <Button
            type="submit"
            disabled={sendButtonDesabled || loading}
            className={cn(
              'min-w-11 max-w-11 h-11 aspect-square rounded-full max-[767px]:min-w-8 max-[767px]:h-8',
            )}
          >
            {!loading ? (
              <LuSend className="size-5" />
            ) : (
              <LuLoader className="size-5 animate-spin" />
            )}
          </Button>
        </form>
      </section>
    </section>
  );
};

export default ChatBox;
