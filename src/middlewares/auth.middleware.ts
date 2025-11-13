import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

export function authenticate(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    console.log(authHeader);

    // Check for Bearer token
    if (!authHeader)
      return res.status(401).json({ error: "Missing Authorization header" });

    // Extract token from "Bearer <token>"
    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer")
      return res.status(401).json({ error: "Invalid Authorization format" });

    // extract and verify token
    const token = parts[1];
    const payload = verifyToken(token);

    // Attach user info to request object
    req.user = {
      id: payload.id,
      role: payload.role as any,
      email: payload.email,
    };

    next();
  } catch (err: any) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}
