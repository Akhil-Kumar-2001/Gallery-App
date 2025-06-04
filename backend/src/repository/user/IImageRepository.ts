import { IImage } from "../../model/image.model";
import { ImageOrderPayload } from "../../types/basicTypes";
import { IBaseRepository } from "../base/IBaseRepository";

interface IImageRepository extends IBaseRepository<IImage> {
    uploadImage(userId: string, title: string, imagePath: string): Promise<IImage | null>
    getImages(userId: string): Promise<IImage[] | null>
    updateOrder(userId: string, imageOrder: ImageOrderPayload): Promise<boolean | null>
    deleteImage(id: string): Promise<boolean | null>
    editImage(title: string, imagePath: string,id:string): Promise<IImage | null>




}

export default IImageRepository;