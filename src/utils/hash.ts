import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

/**
 * hashPassword - create bcrypt hash
 */
export async function hashPassword(plain: string) {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return bcrypt.hash(plain, salt);
}

/**
 * comparePassword - compare plaintext vs hashed
 */
export async function comparePassword(plain: string, hash: string) {
  return bcrypt.compare(plain, hash);
}
