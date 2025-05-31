import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

declare module "express-serve-static-core" {
  interface Request {
    userId?: string;
    email?: string;
  }
}

export const validateToken = () => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const JWT_KEY = process.env.JWT_SECRET as string;
      let accessToken = req.headers.authorization?.split(" ")[1] || req.cookies?.accessToken;

      if (!accessToken) {
        res.status(401).json({ message: "Access token not found, please log in" });
        return;
      }

      jwt.verify(accessToken, JWT_KEY, async (err: unknown, data: JwtPayload | string | undefined) => {
        if (err) {
          console.log("acc", accessToken, err)
          return res.status(403).json({ message: "Invalid or expired token, please log in again." });
        }

        if (!data) {
          return res.status(403).json({ message: "Invalid token structure." });
        }

        const { email, userId } = data as { email: string, userId: string }


        console.log("Checking role of the user in middleware => ", email,userId);

        req.userId = userId;
        next();
      });

    } catch (error) {
      console.log(error)
      res.status(500).json({ message: "Internal server error" });
      return;
    }
  };
};
