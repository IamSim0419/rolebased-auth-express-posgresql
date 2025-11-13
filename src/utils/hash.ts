import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

// hashPassword - hash plaintext password
export async function hashPassword(plain: string) {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return bcrypt.hash(plain, salt);
}

// comparePassword - compare plaintext password with hashed password
export async function comparePassword(plain: string, hash: string) {
  return bcrypt.compare(plain, hash);
}
