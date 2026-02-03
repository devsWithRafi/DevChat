import { v2 as cloudinary } from 'cloudinary';
import { type UploadApiResponse } from 'cloudinary';
import {
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET,
    CLOUDINARY_CLOUD_NAME,
} from '../config/ENV.ts';

cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
});

export const uploadImageToCloudinary = (buffer: Buffer, public_id?: string) => {
    return new Promise<UploadApiResponse>((resolve, reject) => {
        const options: any = {
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
                if (error) return reject(error);
                if (!result)
                    return reject(new Error('No result from cloudinary!'));
                resolve(result);
            })
            .end(buffer);
    });
};

// {
//     "asset_id": "8e236f32bdc781864e61ed286d54f478",
//     "public_id": "ChatApp/fuiewi0nwnbmefwav8is",
//     "version": 1769779302,
//     "version_id": "7add7af1aa197c13fa38ff3603a9f091",
//     "signature": "dfdfdfdfdfdfd",
//     "width": 1710,
//     "height": 916,
//     "format": "png",
//     "resource_type": "image",
//     "created_at": "2026-01-30T13:21:42Z",
//     "tags": [],
//     "bytes": 1169847,
//     "type": "upload",
//     "etag": "9e10dd699d94d7c8eef2ec0c9b206ff8",
//     "placeholder": false,
//     "url": "http://res.cloudinary.com/ddpx8dxi7/image/upload/v1769779302/ChatApp/fuiewi0nwnbmefwav8is.png",
//     "secure_url": "https://res.cloudinary.com/ddpx8dxi7/image/upload/v1769779302/ChatApp/fuiewi0nwnbmefwav8is.png",
//     "asset_folder": "ChatApp",
//     "display_name": "fuiewi0nwnbmefwav8is",
//     "original_filename": "file",
//     "api_key": "fake---dfdfdfdfdfd"
// }