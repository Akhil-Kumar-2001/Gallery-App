// import { Schema, Document, model, Types } from "mongoose";

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



import { Schema, Document, model, Types } from "mongoose";

// Image Schema Interface
interface IImage extends Document {
    userId: Types.ObjectId;
    title: string;
    imagePath: string;
    uploadedAt: Date;
    order: number; // New field for ordering
    _id: Types.ObjectId;
}

const imageSchema = new Schema<IImage>({
    userId: {
        type: Schema.Types.ObjectId,
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

const Image = model<IImage>("Image", imageSchema);

export { 
    Image, 
    IImage 
};