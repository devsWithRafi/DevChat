import Multer from 'multer';
export const upload = Multer({ storage: Multer.memoryStorage() });
