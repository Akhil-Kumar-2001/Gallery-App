import { STATUS_CODES } from "../../constants/statusCode";
import IImageService from "../../service/IImageService"
import IImageController from "../IImageControler";
import { Request, Response } from "express";

class ImageController implements IImageController {

    private _imageService: IImageService;
    constructor(imageService: IImageService) {
        this._imageService = imageService;
    }

    async uploadImage(req: Request, res: Response): Promise<void> {
        console.log("User ID from request:");
        try {
            console.log("Request body:", req.file);
            console.log(req.files as Express.Multer.File[]);
            const files = req.files as Express.Multer.File[];
            if (!files || files.length === 0) {
                res.status(STATUS_CODES.BAD_REQUEST).json({ success: false, message: "No files uploaded" });
                return;
            }
            const buffer = files[0].buffer;
            const userId = req.userId as string;
            const upload = await this._imageService.uploadImage(buffer, req.body.title, userId);
            if (upload) {
                res.status(STATUS_CODES.CREATED).json({ success: true, message: "Image uploaded successfully", data: upload });
            }
        } catch (error) {
            console.error("Error in uploadImage:", error);
            res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ success: false, message: "Internal server error" });
        }
    }

    async getImages(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.userId;
            const response = await this._imageService.getImages(userId as string);
            if (response) {
                res.status(STATUS_CODES.OK).json({ success: true, message: "Image retrived successfull", data: response })
            }
        } catch (error) {
            res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ success: false, message: "Error while getting images" })
        }
    }


    async updateOrder(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.userId as string;
            const imageOrder = req.body
            console.log(imageOrder)
            const response = await this._imageService.updateOrder(userId, imageOrder)
            if (response) {
                res.status(STATUS_CODES.OK).json({ success: true, message: "Image Order changed successfull" })
            }
        } catch (error) {
            res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ success: false, message: "Error while updating the order" })
        }
    }


    async deleteImage(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const response = await this._imageService.deleteImage(id);
            if (response) {
                res.status(STATUS_CODES.OK).json({ success: true, message: "Image Shuffled changed successfull" })
            }
        } catch (error) {
            res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ success: false, message: "Error while deleting the image" })
        }
    }


    async updateImage(req: Request, res: Response): Promise<void> {
        try {
            const files = req.files as Express.Multer.File[];
            const { id } = req.params;
            if (files.length > 0) {
                const buffer = files[0].buffer;
                const upload = await this._imageService.editImage(buffer, req.body.title, id);
                res.status(STATUS_CODES.CREATED).json({ success: true, message: "Image uploaded successfully", data: upload });
            } else {
                const upload = await this._imageService.editImage("", req.body.title, id)
                res.status(STATUS_CODES.CREATED).json({ success: true, message: "Image uploaded successfully", data: upload });
            }
        } catch (error) {
            console.log("what is the error", error)
            res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ success: false, message: "Error while editing the image" })
        }
    }
}


export default ImageController