import IImageRepository from "../IImageRepository";
import { IImage, Image } from '../../model/image.model'; // Adjust the path to your Image model
import { Types } from 'mongoose';
import { ImageOrderPayload } from "../../types/basicTypes";

class ImageRepository implements IImageRepository {

    async uploadImage(userId: string, title: string, imagePath: string): Promise<IImage | null> {
        try {
            const lastImage = await Image.findOne({ userId: new Types.ObjectId(userId) })
                .sort({ order: -1 })
                .select('order');

            const newOrder = lastImage && lastImage.order !== undefined ? lastImage.order + 1 : 0;

            const newImage = new Image({
                userId: new Types.ObjectId(userId),
                title,
                imagePath,
                order: newOrder
            });

            const response = await newImage.save();
            console.log("Image saved to DB.");
            return response ?? null
        } catch (error) {
            console.error('Error uploding image in db', error);
            return null
        }
    }

    async getImages(userId: string): Promise<IImage[] | null> {
        try {
            const response = await Image.find({ userId })
            console.log(response)
            return response;
        } catch (error) {
            console.error('Error while geting images')
            return null
        }
    }



    async updateOrder(userId: string, imageOrder: ImageOrderPayload): Promise<boolean | null> {
        try {
            const bulkOperations = imageOrder.imageOrder.map(item => ({
                updateOne: {
                    filter: {
                        _id: new Types.ObjectId(item._id),
                        userId: new Types.ObjectId(userId)
                    },
                    update: {
                        $set: { order: item.order }
                    }
                }
            }));

            if (bulkOperations.length > 0) {
                await Image.bulkWrite(bulkOperations);
            }

            return true;
        } catch (error) {
            console.error("Failed to update image order:", error);
            return null;
        }
    }


    async deleteImage(id: string): Promise<boolean | null> {
        try {
            const deleteImage = await Image.findByIdAndDelete({ _id: id });
            return deleteImage ? true : null;
        } catch (error) {
            console.error("Failed to delete image:", error);
            return null;
        }
    }


async editImage(title: string, imagePath: string, id: string): Promise<IImage | null> {
    try {
        const updateFields: Partial<{ title: string; imagePath: string }> = {
            title
        };

        if (imagePath && imagePath.trim() !== "") {
            updateFields.imagePath = imagePath;
        }

        const updatedImage = await Image.findByIdAndUpdate(
            id,
            { $set: updateFields },
            { new: true } // to return the updated document if needed
        );

        return updatedImage ?? null;
    } catch (error) {
        console.error("Failed to update image:", error);
        return null;
    }
}

}

export default ImageRepository