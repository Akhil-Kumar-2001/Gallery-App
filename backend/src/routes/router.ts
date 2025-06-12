import Router from 'express';
import UserRepository from '../repository/user/implementation/UserRepository';
import UserService from '../service/implementation/UserService';
import UserController from '../controller/implementation/UserController';
import IUserController from '../controller/IUserControler';
import { validateToken } from '../middleware/validateToken';
import { upload } from '../middleware/multer';
import ImageRepository from '../repository/user/implementation/ImageRepository';
import ImageService from '../service/implementation/ImageService';
import ImageController from '../controller/implementation/ImageController';
import IImageController from '../controller/IImageControler';


const router = Router();


const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController:IUserController = new UserController(userService)


const imageRepository = new ImageRepository();
const imageService = new ImageService(imageRepository);
const imageController:IImageController = new ImageController(imageService)

// signup and signin routes

router.post('/signup', userController.signup.bind(userController));
router.post('/verify-cache',userController.verifyCache.bind(userController))
router.post('/forgot-password', userController.forgotPassword.bind(userController));
router.post('/reset-password', userController.resetPassword.bind(userController));
router.post('/signin', userController.signin.bind(userController));
router.post('/refresh-token',userController.refreshToken.bind(userController))

router.post('/logout',userController.logout.bind(userController));

// images and image upload route
router.post('/upload',validateToken(), upload.array("image"),imageController.uploadImage.bind(imageController))
router.get('/images',validateToken(),imageController.getImages.bind(imageController))
router.post('/change-order',validateToken(),imageController.updateOrder.bind(imageController))

router.delete('/delete-image/:id',validateToken(),imageController.deleteImage.bind(imageController))
router.post('/update-image/:id',validateToken(),upload.array("image"),imageController.updateImage.bind(imageController))


export default router;
