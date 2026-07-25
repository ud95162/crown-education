import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { updateApplication, deleteApplication } from "@/lib/applicationsStore";

export const dynamic = "force-dynamic";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  if (!isAuthenticated()) {
    return NextResponse.json({ ok: false, error: "Unauthorized access." }, { status: 401 });
  }

  try {
    const { id } = params;
    const body = await request.json();

    const updated = await updateApplication(id, body);

    if (!updated) {
      return NextResponse.json(
        { ok: false, error: "Application not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ ok: true, data: updated });
  } catch (err) {
    console.error("Error updating application:", err);
    return NextResponse.json(
      { ok: false, error: "Internal server error." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  if (!isAuthenticated()) {
    return NextResponse.json({ ok: false, error: "Unauthorized access." }, { status: 401 });
  }

  try {
    const { id } = params;
    const success = await deleteApplication(id);

    if (!success) {
      return NextResponse.json(
        { ok: false, error: "Application not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Error deleting application:", err);
    return NextResponse.json(
      { ok: false, error: "Internal server error." },
      { status: 500 }
    );
  }
}
