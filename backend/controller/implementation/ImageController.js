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
Object.defineProperty(exports, "__esModule", { value: true });
const statusCode_1 = require("../../constants/statusCode");
class ImageController {
    constructor(imageService) {
        this._imageService = imageService;
    }
    uploadImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("User ID from request:");
            try {
                console.log("Request body:", req.file);
                console.log(req.files);
                const files = req.files;
                if (!files || files.length === 0) {
                    res.status(statusCode_1.STATUS_CODES.BAD_REQUEST).json({ success: false, message: "No files uploaded" });
                    return;
                }
                const buffer = files[0].buffer;
                const userId = req.userId;
                const upload = yield this._imageService.uploadImage(buffer, req.body.title, userId);
                if (upload) {
                    res.status(statusCode_1.STATUS_CODES.CREATED).json({ success: true, message: "Image uploaded successfully", data: upload });
                }
            }
            catch (error) {
                console.error("Error in uploadImage:", error);
                res.status(statusCode_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ success: false, message: "Internal server error" });
            }
        });
    }
    getImages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.userId;
                const response = yield this._imageService.getImages(userId);
                if (response) {
                    res.status(statusCode_1.STATUS_CODES.OK).json({ success: true, message: "Image retrived successfull", data: response });
                }
            }
            catch (error) {
                res.status(statusCode_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ success: false, message: "Error while getting images" });
            }
        });
    }
    updateOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.userId;
                const imageOrder = req.body;
                console.log(imageOrder);
                const response = yield this._imageService.updateOrder(userId, imageOrder);
                if (response) {
                    res.status(statusCode_1.STATUS_CODES.OK).json({ success: true, message: "Image Order changed successfull" });
                }
            }
            catch (error) {
                res.status(statusCode_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ success: false, message: "Error while updating the order" });
            }
        });
    }
    deleteImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const response = yield this._imageService.deleteImage(id);
                if (response) {
                    res.status(statusCode_1.STATUS_CODES.OK).json({ success: true, message: "Image Shuffled changed successfull" });
                }
            }
            catch (error) {
                res.status(statusCode_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ success: false, message: "Error while deleting the image" });
            }
        });
    }
    updateImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const files = req.files;
                const { id } = req.params;
                if (files.length > 0) {
                    const buffer = files[0].buffer;
                    const upload = yield this._imageService.editImage(buffer, req.body.title, id);
                    res.status(statusCode_1.STATUS_CODES.CREATED).json({ success: true, message: "Image uploaded successfully", data: upload });
                }
                else {
                    const upload = yield this._imageService.editImage("", req.body.title, id);
                    res.status(statusCode_1.STATUS_CODES.CREATED).json({ success: true, message: "Image uploaded successfully", data: upload });
                }
            }
            catch (error) {
                console.log("what is the error", error);
                res.status(statusCode_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ success: false, message: "Error while editing the image" });
            }
        });
    }
}
exports.default = ImageController;
