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
Object.defineProperty(exports, "__esModule", { value: true });
class UserService {
    constructor(userRepository) {
        this._userRepository = userRepository;
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this._userRepository.findByEmail(email);
                return user;
            }
            catch (error) {
                console.error("Error finding user by email:", error);
                return null;
            }
        });
    }
    findByPhoneNumber(phoneNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this._userRepository.findByPhoneNumber(phoneNumber);
                return user;
            }
            catch (error) {
                console.error("Error finding user by email:", error);
                return null;
            }
        });
    }
    createUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this._userRepository.createUser(data);
                return user;
            }
            catch (error) {
                console.error("Error creating user:", error);
                return null;
            }
        });
    }
    updateUser(email, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this._userRepository.updateUser(email, data);
                return user;
            }
            catch (error) {
                console.error("Error updating user:", error);
                return null;
            }
        });
    }
}
exports.default = UserService;
