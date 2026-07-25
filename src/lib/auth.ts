import { cookies } from "next/headers";
import crypto from "crypto";

export const ADMIN_COOKIE_NAME = "crowned_admin_session";

// Secret hash key derived from configured credentials
function getAdminCredentials() {
  const username = process.env.ADMIN_USERNAME || "admin";
  const password = process.env.ADMIN_PASSWORD || "crown2026!";
  return { username, password };
}

export function generateSessionToken(username: string): string {
  const { password } = getAdminCredentials();
  const secret = process.env.ADMIN_SECRET || "crowned-admin-secret-2026";
  return crypto
    .createHmac("sha256", secret)
    .update(`${username}:${password}`)
    .digest("hex");
}

export function verifyAdminCredentials(user: string, pass: string): boolean {
  const { username, password } = getAdminCredentials();
  return user === username && pass === password;
}

export function isAuthenticated(): boolean {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
    if (!token) return false;

    const { username } = getAdminCredentials();
    const expectedToken = generateSessionToken(username);
    return token === expectedToken;
  } catch {
    return false;
  }
}
