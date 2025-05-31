"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = __importDefault(require("../../config/cloudinary"));
class ImageService {
    constructor(imageRepository) {
        this._imageRepository = imageRepository;
    }
    uploadImage(buffer, title, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Convert buffer to base64
                const base64String = buffer.toString('base64');
                const dataUri = `data:image/jpeg;base64,${base64String}`;
                // Upload to Cloudinary
                const result = yield cloudinary_1.default.uploader.upload(dataUri, {
                    folder: 'images', // optional: Cloudinary folder
                });
                console.log("Cloudinary URL:", result.secure_url);
                const uploadImage = yield this._imageRepository.uploadImage(userId, title, result.secure_url);
                return uploadImage;
            }
            catch (error) {
                console.error("Error uploading image:", error);
                throw error;
            }
        });
    }
    getImages(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this._imageRepository.getImages(userId);
            return response;
        });
    }
    updateOrder(userId, imageOrder) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this._imageRepository.updateOrder(userId, imageOrder);
            return response;
        });
    }
    deleteImage(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this._imageRepository.deleteImage(id);
            return response;
        });
    }
    editImage(buffer, title, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (buffer) { // Convert buffer to base64
                    const base64String = buffer.toString('base64');
                    const dataUri = `data:image/jpeg;base64,${base64String}`;
                    // Upload to Cloudinary
                    const result = yield cloudinary_1.default.uploader.upload(dataUri, {
                        folder: 'images', // optional: Cloudinary folder
                    });
                    console.log("Cloudinary URL:", result.secure_url);
                    const uploadImage = yield this._imageRepository.editImage(title, result.secure_url, id);
                    return uploadImage !== null && uploadImage !== void 0 ? uploadImage : null;
                }
                else {
                    const uploadImage = yield this._imageRepository.editImage(title, "", id);
                    return uploadImage !== null && uploadImage !== void 0 ? uploadImage : null;
                }
            }
            catch (error) {
                console.error("Error uploading image:", error);
                throw error;
            }
        });
    }
}
exports.default = ImageService;
