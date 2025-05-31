"use strict";
// import { Schema, Document, model, Types } from "mongoose";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Image = void 0;
// // Image Schema Interface
// interface IImage extends Document {
//     userId: Types.ObjectId;
//     title: string;
//     imagePath: string;
//     uploadedAt: Date;
//     _id: Types.ObjectId;
// }
// const imageSchema = new Schema<IImage>({
//     userId: {
//         type: Schema.Types.ObjectId,
//         ref: 'User',
//         required: true
//     },
//     title: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     imagePath: {
//         type: String,
//         required: true
//     },
//     uploadedAt: {
//         type: Date,
//         default: Date.now
//     }
// }, { timestamps: true });
// // Add index for better query performance
// imageSchema.index({ userId: 1, uploadedAt: -1 });
// const Image = model<IImage>("Image", imageSchema);
// export { 
//     Image, 
//     IImage 
// };
const mongoose_1 = require("mongoose");
const imageSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    imagePath: {
        type: String,
        required: true
    },
    uploadedAt: {
        type: Date,
        default: Date.now
    },
    order: {
        type: Number,
        default: 0 // Default to 0 for new images
    }
}, { timestamps: true });
// Add index for better query performance
imageSchema.index({ userId: 1, order: 1 }); // Updated index to include order
const Image = (0, mongoose_1.model)("Image", imageSchema);
exports.Image = Image;
