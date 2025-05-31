"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserRepository_1 = __importDefault(require("../repository/implementation/UserRepository"));
const UserService_1 = __importDefault(require("../service/implementation/UserService"));
const UserController_1 = __importDefault(require("../controller/implementation/UserController"));
const validateToken_1 = require("../middleware/validateToken");
const multer_1 = require("../middleware/multer");
const ImageRepository_1 = __importDefault(require("../repository/implementation/ImageRepository"));
const ImageService_1 = __importDefault(require("../service/implementation/ImageService"));
const ImageController_1 = __importDefault(require("../controller/implementation/ImageController"));
const router = (0, express_1.default)();
const userRepository = new UserRepository_1.default();
const userService = new UserService_1.default(userRepository);
const userController = new UserController_1.default(userService);
const imageRepository = new ImageRepository_1.default();
const imageService = new ImageService_1.default(imageRepository);
const imageController = new ImageController_1.default(imageService);
// signup and signin routes
router.post('/signup', userController.signup.bind(userController));
router.post('/forgot-password', userController.forgotPassword.bind(userController));
router.post('/reset-password', userController.resetPassword.bind(userController));
router.post('/signin', userController.signin.bind(userController));
router.post('/refresh-token', userController.refreshToken.bind(userController));
// images and image upload route
router.post('/upload', (0, validateToken_1.validateToken)(), multer_1.upload.array("image"), imageController.uploadImage.bind(imageController));
router.get('/images', (0, validateToken_1.validateToken)(), imageController.getImages.bind(imageController));
router.post('/change-order', (0, validateToken_1.validateToken)(), imageController.updateOrder.bind(imageController));
router.delete('/delete-image/:id', (0, validateToken_1.validateToken)(), imageController.deleteImage.bind(imageController));
router.post('/update-image/:id', (0, validateToken_1.validateToken)(), multer_1.upload.array("image"), imageController.updateImage.bind(imageController));
exports.default = router;
