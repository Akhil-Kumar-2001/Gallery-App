"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const statusCode_1 = require("../../constants/statusCode");
const passwordUtils_1 = __importDefault(require("../../utils/passwordUtils"));
const mailUtilits_1 = __importDefault(require("../../utils/mailUtilits"));
const tokenUtility_1 = require("../../utils/tokenUtility");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserController {
    constructor(userService) {
        this._userService = userService;
    }
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, email, phoneNumber } = req.body;
                console.log(phoneNumber);
                let { password } = req.body;
                if (!username || !email || !phoneNumber || !password) {
                    res.status(statusCode_1.STATUS_CODES.BAD_REQUEST).json({ success: false, message: "All fields are required" });
                    return;
                }
                const existingUser = yield this._userService.findByEmail(email);
                if (existingUser) {
                    res.status(statusCode_1.STATUS_CODES.CONFLICT).json({ success: false, message: "User already exists" });
                    return;
                }
                const userPhoneNumberExist = yield this._userService.findByPhoneNumber(phoneNumber);
                if (userPhoneNumberExist) {
                    res.status(statusCode_1.STATUS_CODES.CONFLICT).json({ success: false, message: "User with this phone number already exists" });
                    return;
                }
                const hashedPassword = yield passwordUtils_1.default.passwordHash(password);
                if (!hashedPassword) {
                    res.status(statusCode_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ success: false, message: "Error hashing password" });
                    return;
                }
                password = hashedPassword;
                const newUser = {
                    username,
                    email,
                    phoneNumber,
                    password
                };
                const user = yield this._userService.createUser(newUser);
                if (!user) {
                    res.status(statusCode_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ success: false, message: "Error creating user" });
                    return;
                }
                res.status(statusCode_1.STATUS_CODES.CREATED).json({ success: true, message: "User created successfully", user });
            }
            catch (error) {
                console.error("Error in signup:", error);
                res.status(statusCode_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ success: false, message: "Internal server error" });
            }
        });
    }
    forgotPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                console.log(email);
                if (!email) {
                    res.status(statusCode_1.STATUS_CODES.BAD_REQUEST).json({ success: false, message: "Email is required" });
                    return;
                }
                const userExists = yield this._userService.findByEmail(email);
                if (!userExists) {
                    res.status(statusCode_1.STATUS_CODES.NOT_FOUND).json({ success: false, message: "User not found" });
                    return;
                }
                const cacheCode = Math.random().toString(36).substring(2, 8);
                const expiresIn = 10 * 60 * 1000; // 10 minutes
                const updatedUser = yield this._userService.updateUser(email, {
                    cacheCode,
                    cacheCodeExpires: new Date(Date.now() + expiresIn)
                });
                if (updatedUser) {
                    yield mailUtilits_1.default.sendMail(email, cacheCode, "Verification otp");
                    res.status(statusCode_1.STATUS_CODES.OK).json({ success: true, message: "Verification code sent to email" });
                    return;
                }
            }
            catch (error) {
                console.error("Error in forgotPassword:", error);
                res.status(statusCode_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ success: false, message: "Internal server error" });
            }
        });
    }
    resetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password, cacheCode } = req.body;
                console.log(email, password, cacheCode);
                console.log(email);
                if (!email || !password || !cacheCode) {
                    res.status(statusCode_1.STATUS_CODES.BAD_REQUEST).json({ success: false, message: "Email and new password are required" });
                    return;
                }
                const userExists = yield this._userService.findByEmail(email);
                if (!userExists) {
                    res.status(statusCode_1.STATUS_CODES.NOT_FOUND).json({ success: false, message: "User not found" });
                    return;
                }
                const userCacheCode = userExists === null || userExists === void 0 ? void 0 : userExists.cacheCode;
                console.log("user chache code", userCacheCode);
                const userCacheCodeExpires = userExists === null || userExists === void 0 ? void 0 : userExists.cacheCodeExpires;
                if (userCacheCode !== cacheCode || !userCacheCodeExpires || userCacheCodeExpires < new Date()) {
                    res.status(statusCode_1.STATUS_CODES.UNAUTHORIZED).json({ success: false, message: "Invalid or expired verification code" });
                    return;
                }
                const hashedPassword = yield passwordUtils_1.default.passwordHash(password);
                if (!hashedPassword) {
                    res.status(statusCode_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ success: false, message: "Error hashing password" });
                    return;
                }
                const updatedUser = yield this._userService.updateUser(email, {
                    password: hashedPassword
                });
                if (!updatedUser) {
                    res.status(statusCode_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ success: false, message: "Error updating password" });
                    return;
                }
                res.status(statusCode_1.STATUS_CODES.OK).json({ success: true, message: "Password reset successfully" });
            }
            catch (error) {
                console.error("Error in resetPassword:", error);
                res.status(statusCode_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ success: false, message: "Internal server error" });
            }
        });
    }
    signin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                if (!email || !password) {
                    res.status(statusCode_1.STATUS_CODES.BAD_REQUEST).json({ success: false, message: "Email and password are required" });
                    return;
                }
                const userExists = yield this._userService.findByEmail(email);
                if (!userExists) {
                    res.status(statusCode_1.STATUS_CODES.NOT_FOUND).json({ success: false, message: "User not found" });
                    return;
                }
                const isPasswordValid = yield passwordUtils_1.default.comparePassword(password, userExists === null || userExists === void 0 ? void 0 : userExists.password);
                if (!isPasswordValid) {
                    res.status(statusCode_1.STATUS_CODES.UNAUTHORIZED).json({ success: false, message: "Invalid password" });
                    return;
                }
                const tokenInstance = new tokenUtility_1.Token();
                const { accessToken, refreshToken } = tokenInstance.generatingTokens(userExists.id, userExists.email);
                if (!accessToken || !refreshToken) {
                    res.status(statusCode_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ success: false, message: "Error generating tokens" });
                    return;
                }
                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                });
                res.cookie("accessToken", accessToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                    maxAge: 15 * 60 * 1000,
                });
                console.log("access token", accessToken);
                console.log("refresh token", refreshToken);
                const filteredUser = {
                    id: userExists.id,
                    email: userExists.email,
                    accessToken
                };
                res.status(statusCode_1.STATUS_CODES.OK).json({ success: true, message: "Signin successful", data: filteredUser });
            }
            catch (error) {
                console.error("Error in signin:", error);
                res.status(statusCode_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ success: false, message: "Internal server error" });
            }
        });
    }
    refreshToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const refreshToken = req.cookies.refreshToken;
                if (!refreshToken) {
                    res.status(statusCode_1.STATUS_CODES.UNAUTHORIZED).json({ success: false, message: 'Refresh token missing' });
                    return;
                }
                // **Verify the refresh token**
                jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
                    if (err) {
                        return res.status(statusCode_1.STATUS_CODES.FORBIDDEN).json({ success: false, message: 'Invalid refresh token' });
                    }
                    console.log("Decode in refresh token", decoded);
                    // Generate a new access token
                    const tokenInstance = new tokenUtility_1.Token();
                    const { role, userId } = decoded;
                    const newAccessToken = tokenInstance.generatingTokens(userId, role).accessToken;
                    res.cookie("accessToken", newAccessToken, {
                        httpOnly: true,
                        secure: true,
                        sameSite: "none",
                        maxAge: 15 * 60 * 1000,
                    });
                    res.status(statusCode_1.STATUS_CODES.OK).json({ success: true, accessToken: newAccessToken });
                });
            }
            catch (error) {
                console.error('Error refreshing token:', error);
                res.status(statusCode_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ success: false, message: "error while refreshing token" });
            }
        });
    }
    ;
}
exports.default = UserController;
