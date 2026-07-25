import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getAllApplications, resetToSampleData } from "@/lib/applicationsStore";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!isAuthenticated()) {
    return NextResponse.json({ ok: false, error: "Unauthorized access." }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const reset = searchParams.get("reset");

  if (reset === "true") {
    const freshData = await resetToSampleData();
    return NextResponse.json({ ok: true, data: freshData });
  }

  const search = searchParams.get("search")?.toLowerCase() || "";
  const statusFilter = searchParams.get("status") || "All";
  const curriculumFilter = searchParams.get("curriculum") || "All";

  let apps = await getAllApplications();

  // Stats before filtering
  const stats = {
    total: apps.length,
    pending: apps.filter((a) => a.status === "Pending").length,
    underReview: apps.filter((a) => a.status === "Under Review").length,
    contacted: apps.filter((a) => a.status === "Contacted").length,
    approved: apps.filter((a) => a.status === "Approved").length,
    enrolled: apps.filter((a) => a.status === "Enrolled").length,
    rejected: apps.filter((a) => a.status === "Rejected").length,
  };

  // Filter by status
  if (statusFilter !== "All") {
    apps = apps.filter((a) => a.status === statusFilter);
  }

  // Filter by curriculum
  if (curriculumFilter !== "All") {
    apps = apps.filter((a) => a.curriculum.toLowerCase().includes(curriculumFilter.toLowerCase()));
  }

  // Filter by search query
  if (search) {
    apps = apps.filter(
      (a) =>
        a.name.toLowerCase().includes(search) ||
        a.email.toLowerCase().includes(search) ||
        a.contactNumber.toLowerCase().includes(search) ||
        a.city.toLowerCase().includes(search) ||
        a.schoolOrBusiness.toLowerCase().includes(search) ||
        a.id.toLowerCase().includes(search) ||
        a.subjects.some((s) => s.toLowerCase().includes(search))
    );
  }

  return NextResponse.json({
    ok: true,
    data: apps,
    stats,
  });
}
