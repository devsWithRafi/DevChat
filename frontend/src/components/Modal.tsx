import { Dialog, DialogContent } from '@/@/components/ui/dialog';
import type { Dispatch, ReactNode, SetStateAction } from 'react';

interface ModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
}

const Modal = ({ open, setOpen, children }: ModalProps) => {
  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogContent className="bg-transparent p-0 border-transparent shadow-none w-auto h-auto max-w-none">
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
