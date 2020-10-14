import { diskStorage } from 'multer';
import { extname } from 'path';
import * as uuid from 'uuid/v4';

export const API_URL: string = 'http://192.168.3.3:3000/api';
export type Uploads = 'images' | 'pdfs' | 'xlsx';

/**
 * Generates storage multer
 * @param [type] url file type
 * @param [maxSize] file size in megabites
 * @returns  config to disk storage
 */
export const generateStorageMulter = (
    type: Uploads = 'images',
    maxSize: number = 3,
) => ({
    storage: diskStorage({
        destination: `./public/uploads/${type}`,
        filename: (req, file, cb) => {
            return cb(null, `${uuid()}${extname(file.originalname)}`);
        },
    }),
    limits: {
        fileSize: maxSize * 1024 * 1024,
    },
});
