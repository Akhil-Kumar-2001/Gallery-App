import cloudinary from '../../config/cloudinary';
import { IImage } from '../../model/image.model'; // Adjust the path to your Image model
import { ImageOrderPayload } from "../../types/basicTypes";
import IImageService from "../IImageService";
import IImageRepository from "../../repository/IImageRepository";

class ImageService implements IImageService {
    private _imageRepository: IImageRepository;
    constructor(imageRepository: IImageRepository) {
        this._imageRepository = imageRepository;
    }


    async uploadImage(buffer: Buffer, title: string, userId: string): Promise<IImage | null> {
        try {

            // Convert buffer to base64
            const base64String = buffer.toString('base64');
            const dataUri = `data:image/jpeg;base64,${base64String}`;

            // Upload to Cloudinary
            const result = await cloudinary.uploader.upload(dataUri, {
                folder: 'images', // optional: Cloudinary folder
            });

            console.log("Cloudinary URL:", result.secure_url);

            const uploadImage = await this._imageRepository.uploadImage(userId, title, result.secure_url)
            return uploadImage;

        } catch (error) {
            console.error("Error uploading image:", error);
            throw error;
        }
    }

    async getImages(userId: string): Promise<IImage[] | null> {
        const response = await this._imageRepository.getImages(userId);
        return response
    }

    async updateOrder(userId: string, imageOrder: ImageOrderPayload): Promise<boolean | null> {
        const response = await this._imageRepository.updateOrder(userId, imageOrder);
        return response;
    }

    async deleteImage(id: string): Promise<boolean | null> {
        const response = await this._imageRepository.deleteImage(id);
        return response;
    }

    async editImage(buffer: Buffer, title: string, id: string): Promise<IImage | null> {
        try {

            if (buffer) {// Convert buffer to base64
                const base64String = buffer.toString('base64');
                const dataUri = `data:image/jpeg;base64,${base64String}`;

                // Upload to Cloudinary
                const result = await cloudinary.uploader.upload(dataUri, {
                    folder: 'images', // optional: Cloudinary folder
                });

                console.log("Cloudinary URL:", result.secure_url);

                const uploadImage = await this._imageRepository.editImage(title, result.secure_url, id)
                return uploadImage ??  null;
            } else {
                const uploadImage = await this._imageRepository.editImage(title, "", id)
                return uploadImage ??  null;
            }

        } catch (error) {
            console.error("Error uploading image:", error);
            throw error;
        }
    }

}
export default ImageService;