import jwt from "jsonwebtoken";
import { Role } from "@prisma/client";

const secret = process.env.JWT_SECRET || "dev-secret";
const expiresIn = process.env.JWT_EXPIRES_IN || "1h";

export function signToken(payload: { id: number; role: Role; email: string }) {
  return jwt.sign(payload, secret, { expiresIn });
}

export function verifyToken<T extends object = any>(token: string): T {
  return jwt.verify(token, secret) as T;
}
