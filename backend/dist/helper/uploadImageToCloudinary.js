import { v2 as cloudinary } from 'cloudinary';
import {} from 'cloudinary';
import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME, } from '../config/ENV.js';
cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
});
export const uploadImageToCloudinary = (buffer, public_id) => {
    return new Promise((resolve, reject) => {
        const options = {
            folder: public_id ? undefined : 'ChatApp',
        };
        if (public_id) {
            options.public_id = public_id;
            options.overwrite = true;
            options.invalidate = true;
            delete options.folder;
        }
        cloudinary.uploader
            .upload_stream(options, (error, result) => {
            if (error)
                return reject(error);
            if (!result)
                return reject(new Error('No result from cloudinary!'));
            resolve(result);
        })
            .end(buffer);
    });
};
//# sourceMappingURL=uploadImageToCloudinary.js.map