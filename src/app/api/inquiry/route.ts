import { NextResponse } from "next/server";
import { addApplication } from "@/lib/applicationsStore";

export const dynamic = "force-dynamic";

/**
 * Inquiry endpoint — Persists to application store.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      contactNumber,
      phone,
      email,
      age,
      schoolOrBusiness,
      city,
      guardianDetails,
      curriculum,
      subjects,
      learningMode,
      classType,
      additionalNotes,
      message,
    } = body ?? {};

    const primaryPhone = contactNumber || phone;

    if (!name || !primaryPhone) {
      return NextResponse.json(
        { ok: false, error: "Name and contact number are required." },
        { status: 400 }
      );
    }

    const newApp = await addApplication({
      name,
      email: email || "",
      contactNumber: primaryPhone,
      age: age || "",
      schoolOrBusiness: schoolOrBusiness || "",
      city: city || "",
      guardianDetails: guardianDetails || "",
      curriculum: curriculum || "General",
      subjects: Array.isArray(subjects) ? subjects : subjects ? [subjects] : [],
      learningMode: learningMode || "Online",
      classType: classType || "Individual",
      additionalNotes: additionalNotes || message || "",
    });

    console.log("New CrownEd Application Saved:", newApp.id, newApp.name);

    return NextResponse.json({ ok: true, applicationId: newApp.id });
  } catch (error) {
    console.error("Error saving inquiry:", error);
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 }
    );
  }
}
