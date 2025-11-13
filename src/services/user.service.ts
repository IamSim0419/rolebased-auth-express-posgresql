import { prisma } from "../prisma";
import { hashPassword, comparePassword } from "../utils/hash";
import { signToken } from "../utils/jwt";
import { Role } from "@prisma/client";

// Registers a new user and returns user info along with JWT token
export async function registerUser(data: {
  email: string;
  password: string;
  name?: string;
  role?: Role;
}) {
  const exists = await prisma.user.findUnique({ where: { email: data.email } });
  if (exists) throw new Error("Email already exists");

  const hashed = await hashPassword(data.password);
  const user = await prisma.user.create({
    data: {
      email: data.email,
      password: hashed,
      name: data.name,
      role: data.role ?? Role.USER,
    },
    select: { id: true, email: true, name: true, role: true },
  });
  const token = signToken({ id: user.id, email: user.email, role: user.role });
  return { user, token };
}

// Logs in a user and returns user info along with JWT token
export async function loginUser(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("Invalid credentials");

  const ok = await comparePassword(password, user.password);
  if (!ok) throw new Error("Invalid credentials");

  const token = signToken({ id: user.id, email: user.email, role: user.role });
  return {
    user: { id: user.id, email: user.email, name: user.name, role: user.role },
    token,
  };
}

// Retrieves all users (admin only)
export async function getAllUsers() {
  return prisma.user.findMany({
    select: { id: true, email: true, name: true, role: true, createdAt: true },
  });
}
