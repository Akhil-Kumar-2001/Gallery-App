// import multer from "multer";



// const storage = multer.memoryStorage();


// export const upload = multer({
//     storage,
//     limits: {
//         fileSize: 5 * 1024 * 1024, // 5 MB limit
//     },
//     fileFilter: (req, file, cb) => {
//         const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
//         if (!allowedTypes.includes(file.mimetype)) {
//             return cb(new Error('Only .jpg, .png, and .gif formats are allowed!'));
//         }
//         cb(null, true);
//     }
// })







import multer from "multer";
import path from "path";

const storage = multer.memoryStorage();

export const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5 MB limit
    },
    fileFilter: (req, file, cb) => {
        console.log('File details:', {
            originalName: file.originalname,
            mimetype: file.mimetype,
            size: file.size
        });
        
        // Check MIME type
        const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
        
        // Also check file extension as a fallback
        const fileExtension = path.extname(file.originalname).toLowerCase();
        const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
        
        const isMimeTypeValid = allowedMimeTypes.includes(file.mimetype);
        const isExtensionValid = allowedExtensions.includes(fileExtension);
        
        if (!isMimeTypeValid && !isExtensionValid) {
            console.log('File rejected:', file.mimetype, fileExtension);
            return cb(new Error('Only .jpg, .png, and .gif formats are allowed!'));
        }
        
        // Additional security check - verify it's actually an image
        if (!file.mimetype.startsWith('image/')) {
            return cb(new Error('File must be an image!'));
        }
        
        cb(null, true);
    }
});