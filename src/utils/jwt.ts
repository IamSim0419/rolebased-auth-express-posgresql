import jwt from "jsonwebtoken";
import { Role } from "@prisma/client";

const secret: jwt.Secret = process.env.JWT_SECRET || "dev-secret";
const expiresIn = (process.env.JWT_EXPIRES_IN ||
  "1h") as unknown as jwt.SignOptions["expiresIn"];

export function signToken(payload: {
  id: number;
  role: Role;
  email: string;
}): string {
  // ensure payload is acceptable to the jwt.sign overloads
  return jwt.sign(payload as jwt.JwtPayload, secret, { expiresIn });
}

// returns the decoded payload: { id: number, role: Role, email: string }
export function verifyToken<T extends object = any>(token: string): T {
  return jwt.verify(token, secret) as T;
}
