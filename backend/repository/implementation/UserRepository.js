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
const user_model_1 = __importDefault(require("../../model/user.model"));
class UserRepository {
    /**
     * Finds a user by email.
     * @param email - The email of the user to find.
     * @returns A promise that resolves to the user if found, or null if not found.
     */
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.default.findOne({ email });
            if (!user) {
                return null;
            }
            return user;
        });
    }
    /**
     * Finds a user by email.
     * @param phoneNumber - The phoneNumber of the user to find.
     * @returns A promise that resolves to the user if found, or null if not found.
     */
    findByPhoneNumber(phoneNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.default.findOne({ phoneNumber });
            if (!user)
                return null;
            return user;
        });
    }
    /**
     * Creates a new user.
     * @param data - The user data to create.
     * @returns A promise that resolves to the created user or null if an error occurs.
     */
    createUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = new user_model_1.default(data);
                yield user.save();
                return user;
            }
            catch (error) {
                console.error("Error creating user:", error);
                return null;
            }
        });
    }
    /**
     * Updates a user by email.
     * @param email - The email of the user to update.
     * @param data - The data to update the user with.
     * @returns A promise that resolves to the updated user or null if an error occurs.
     */
    updateUser(email, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("data in repo", data);
                const user = yield user_model_1.default.findOneAndUpdate({ email }, data, { new: true });
                if (!user) {
                    return null;
                }
                console.log(user);
                return user;
            }
            catch (error) {
                console.error("Error updating user:", error);
                return null;
            }
        });
    }
}
exports.default = UserRepository;
