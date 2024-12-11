import { Request, Response, NextFunction } from "express";
import { verifyJWT } from "../utils/jwt.util";
import { User } from "../models/user.model";
import { verifyGoogleToken } from "../utils/googleAuth.util";

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1]; // Expect 'Bearer <token>'
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    // Verify the JWT token
    const decoded = verifyJWT(token) as { userId: string };

    // Check if the user exists in the database
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify the Google auth token
    console.log({user})
    const isTokenValid = await verifyGoogleToken(user.authToken);
    if (!isTokenValid) {
      return res.status(401).json({ message: "Invalid Google token" });
    }

    // Attach the user to the request object
    req.user = user;
    next();
  } catch (err) {
    console.error("Authentication error:", err);
    res.status(401).json({ message: "Invalid Google token" });
  }
};
