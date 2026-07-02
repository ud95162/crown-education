import { NextResponse } from "next/server";

/**
 * Inquiry endpoint — STUB.
 *
 * For now this just validates and logs the inquiry so the form works
 * end-to-end. When you pick a data/email stack, wire it here:
 *   1. Persist to a DB (Prisma + SQLite/Postgres)
 *   2. Send an email alert to the client (Resend / Nodemailer)
 * Everything the admin panel will read comes through this route.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body ?? {};

    if (!name || !email || !phone) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields." },
        { status: 400 },
      );
    }

    // TODO: save to database + send email notification.
    console.log("New CrownEd inquiry:", {
      name,
      email,
      phone,
      level: body.level,
      subject: body.subject,
      message,
      receivedAt: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 },
    );
  }
}
