import { Role } from "@prisma/client";

declare global {
  namespace Express {
    // Extend Express Request interface to include user property
    interface Request {
      user?: { id: number; role: Role; email: string };
    }
  }
}
