import { Request, Response, NextFunction } from "express";
import { Role } from "@prisma/client";

export function authorize(allowed: Role[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) return res.status(401).json({ error: "Not authenticated" });

    if (!allowed.includes(user.role))
      return res.status(403).json({ error: "Forbidden: insufficient role" });
    next();
  };
}
