import { IImage } from "../model/image.model";
import { ImageOrderPayload } from "../types/basicTypes";

interface IImageService {
    uploadImage(buffer:Buffer, title: string,userId:string): Promise<IImage | null>;
    getImages(userId:string):Promise<IImage[] | null>
    updateOrder(userId:string,imageOrder:ImageOrderPayload):Promise<boolean | null>
    deleteImage(id:string):Promise<boolean | null>
    editImage(buffer:Buffer | string, title: string,id:string): Promise<IImage | null>;
}
export default IImageService;