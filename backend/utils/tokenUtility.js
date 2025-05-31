"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class Token {
    constructor() {
        this.JWT_Key = process.env.JWT_SECRET;
        this.refreshSecret = process.env.REFRESH_TOKEN_SECRET || " ";
    }
    generatingTokens(userId, email) {
        const accessToken = jsonwebtoken_1.default.sign({ userId, email }, this.JWT_Key, { expiresIn: "30m" });
        const refreshToken = jsonwebtoken_1.default.sign({ userId, email }, this.refreshSecret, { expiresIn: "7d" });
        return { accessToken, refreshToken };
    }
}
exports.Token = Token;
