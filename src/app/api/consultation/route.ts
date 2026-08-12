import { NextResponse } from "next/server";
import { addApplication } from "@/lib/applicationsStore";
import { sendEmailNotification } from "@/lib/mailer";

export const dynamic = "force-dynamic";

/**
 * Consultation endpoint — Saves consultation booking & triggers Gmail notification.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      contactNumber,
      phone,
      email,
      curriculum,
      subject,
      preferredDate,
      preferredTime,
      message,
      notes,
    } = body ?? {};

    const primaryPhone = contactNumber || phone;

    if (!name || !primaryPhone) {
      return NextResponse.json(
        { ok: false, error: "Name and contact number are required." },
        { status: 400 }
      );
    }

    const additionalNotesCombined = [
      preferredDate ? `Preferred Date: ${preferredDate}` : "",
      preferredTime ? `Preferred Time: ${preferredTime}` : "",
      message || notes || "",
    ]
      .filter(Boolean)
      .join(" | ");

    // Save into applications store under Consultation status/tag
    const newBooking = await addApplication({
      name,
      email: email || "",
      contactNumber: primaryPhone,
      age: "",
      schoolOrBusiness: "",
      city: "",
      guardianDetails: "",
      curriculum: curriculum || "Consultation Request",
      subjects: subject ? [subject] : ["1-on-1 Consultation"],
      learningMode: "Online / Consultation",
      classType: "Individual",
      additionalNotes: `[BOOK A CONSULTATION] ${additionalNotesCombined}`,
    });

    console.log("New Consultation Booking Saved:", newBooking.id, newBooking.name);

    // Send email notification via Gmail SMTP
    const emailResult = await sendEmailNotification({
      type: "consultation",
      name,
      contactNumber: primaryPhone,
      email,
      curriculum,
      subject: subject || "1-on-1 Consultation",
      preferredDate,
      preferredTime,
      message: message || notes,
    });

    return NextResponse.json({
      ok: true,
      bookingId: newBooking.id,
      emailSent: emailResult.sent,
    });
  } catch (error) {
    console.error("Error processing consultation booking:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to submit consultation booking." },
      { status: 500 }
    );
  }
}
