import { prisma } from "../prisma";
import { hashPassword, comparePassword } from "../utils/hash";
import { signToken } from "../utils/jwt";
import { Role } from "@prisma/client";

export async function registerUser(data: {
  email: string;
  password: string;
  name?: string;
  role?: Role;
}) {
  const hashed = await hashPassword(data.password); // returns hashed password

  const user = await prisma.user.create({
    data: {
      email: data.email,
      password: hashed,
      name: data.name,
      role: data.role ?? Role.USER,
    },
    select: { id: true, email: true, role: true, name: true },
  });
  const token = signToken({ id: user.id, role: user.role, email: user.email });

  return { user, token };
}

export async function loginUser(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) throw new Error("Invalid credentials");

  const ok = await comparePassword(password, user.password);

  if (!ok) throw new Error("Invalid credentials");

  const token = signToken({ id: user.id, role: user.role, email: user.email });

  return {
    user: { id: user.id, email: user.email, role: user.role, name: user.name },
    token,
  };
}

export async function findAllUsers() {
  return prisma.user.findMany({
    select: { id: true, email: true, role: true, name: true, createdAt: true },
  });
}
