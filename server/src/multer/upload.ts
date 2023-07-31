import { checkPictureType } from '@/utils/checkPictureType';
import multer from 'multer';

const profilePicsStorage = multer.diskStorage({
    destination: './public/profile',
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}--${file.originalname}`);
    },
});

export const profilePicsUpload = multer({
    storage: profilePicsStorage,
    limits: {
        fileSize: 10000000
    },
    fileFilter(req, file, callback) {
        checkPictureType(file, callback)
    },
});
