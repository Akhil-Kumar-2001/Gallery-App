"use strict";
// import multer from "multer";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
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
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const storage = multer_1.default.memoryStorage();
exports.upload = (0, multer_1.default)({
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
        const fileExtension = path_1.default.extname(file.originalname).toLowerCase();
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
