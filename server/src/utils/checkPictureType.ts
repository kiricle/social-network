import path from 'path'

export const checkPictureType = function (file, cb) {
    const fileTypes = /jpeg|jpg|png|gif|svg/;

    const extName = fileTypes.test(
        path.extname(file.originalname).toLowerCase()
    );

    const mimeType = fileTypes.test(file.mimetype);

    if (mimeType && extName) {
        return cb(null, true);
    } else {
        cb('Error: You can Only Upload Images!!');
    }
};
