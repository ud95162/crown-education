import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  ADMIN_COOKIE_NAME,
  generateSessionToken,
  verifyAdminCredentials,
  isAuthenticated,
} from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const authed = isAuthenticated();
  return NextResponse.json({
    authenticated: authed,
    username: authed ? (process.env.ADMIN_USERNAME || "admin") : null,
  });
}

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { ok: false, error: "Username and password are required." },
        { status: 400 }
      );
    }

    if (!verifyAdminCredentials(username, password)) {
      return NextResponse.json(
        { ok: false, error: "Invalid admin username or password." },
        { status: 401 }
      );
    }

    const token = generateSessionToken(username);
    const cookieStore = cookies();

    cookieStore.set({
      name: ADMIN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: "lax",
    });

    return NextResponse.json({ ok: true, username });
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json(
      { ok: false, error: "Internal server error." },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const cookieStore = cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
  return NextResponse.json({ ok: true });
}
