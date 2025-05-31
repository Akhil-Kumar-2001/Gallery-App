import { Request, Response } from "express";

interface IImageController {
    uploadImage(req:Request,res:Response): Promise<void>;
    getImages(req:Request,res:Response): Promise<void>;
    updateOrder(req:Request,res:Response): Promise<void>;
    deleteImage(req:Request,res:Response): Promise<void>;
    updateImage(req:Request,res:Response): Promise<void>;
    
}
export default IImageController;