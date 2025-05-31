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
const image_model_1 = require("../../model/image.model"); // Adjust the path to your Image model
const mongoose_1 = require("mongoose");
class ImageRepository {
    uploadImage(userId, title, imagePath) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const lastImage = yield image_model_1.Image.findOne({ userId: new mongoose_1.Types.ObjectId(userId) })
                    .sort({ order: -1 })
                    .select('order');
                const newOrder = lastImage && lastImage.order !== undefined ? lastImage.order + 1 : 0;
                const newImage = new image_model_1.Image({
                    userId: new mongoose_1.Types.ObjectId(userId),
                    title,
                    imagePath,
                    order: newOrder
                });
                const response = yield newImage.save();
                console.log("Image saved to DB.");
                return response !== null && response !== void 0 ? response : null;
            }
            catch (error) {
                console.error('Error uploding image in db', error);
                return null;
            }
        });
    }
    getImages(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield image_model_1.Image.find({ userId });
                console.log(response);
                return response;
            }
            catch (error) {
                console.error('Error while geting images');
                return null;
            }
        });
    }
    updateOrder(userId, imageOrder) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bulkOperations = imageOrder.imageOrder.map(item => ({
                    updateOne: {
                        filter: {
                            _id: new mongoose_1.Types.ObjectId(item._id),
                            userId: new mongoose_1.Types.ObjectId(userId)
                        },
                        update: {
                            $set: { order: item.order }
                        }
                    }
                }));
                if (bulkOperations.length > 0) {
                    yield image_model_1.Image.bulkWrite(bulkOperations);
                }
                return true;
            }
            catch (error) {
                console.error("Failed to update image order:", error);
                return null;
            }
        });
    }
    deleteImage(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleteImage = yield image_model_1.Image.findByIdAndDelete({ _id: id });
                return deleteImage ? true : null;
            }
            catch (error) {
                console.error("Failed to delete image:", error);
                return null;
            }
        });
    }
    editImage(title, imagePath, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updateFields = {
                    title
                };
                if (imagePath && imagePath.trim() !== "") {
                    updateFields.imagePath = imagePath;
                }
                const updatedImage = yield image_model_1.Image.findByIdAndUpdate(id, { $set: updateFields }, { new: true } // to return the updated document if needed
                );
                return updatedImage !== null && updatedImage !== void 0 ? updatedImage : null;
            }
            catch (error) {
                console.error("Failed to update image:", error);
                return null;
            }
        });
    }
}
exports.default = ImageRepository;
