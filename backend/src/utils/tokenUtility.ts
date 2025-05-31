import jwt from 'jsonwebtoken';
import { IToken } from '../types/basicTypes';
import dotenv from 'dotenv';
dotenv.config();


export class Token implements IToken {
  
  private readonly JWT_Key: string = process.env.JWT_SECRET as string;
  private readonly refreshSecret: string =
    process.env.REFRESH_TOKEN_SECRET || " ";

  generatingTokens(userId: string, email: string): {
    accessToken: string;
    refreshToken: string;
  } {
    const accessToken = jwt.sign(
      { userId, email },
      this.JWT_Key,
      { expiresIn: "30m" }
    );

    const refreshToken = jwt.sign(
      { userId, email }, 
      this.refreshSecret,
      { expiresIn: "7d" }
    );

    return { accessToken, refreshToken };
  }
}

