import fs from "fs";
import path from "path";
import { executeQuery } from "./db";

export type ApplicationStatus =
  | "Pending"
  | "Under Review"
  | "Contacted"
  | "Approved"
  | "Enrolled"
  | "Rejected";

export interface StudentApplication {
  id: string;
  name: string;
  email: string;
  contactNumber: string;
  age: string;
  schoolOrBusiness: string;
  city: string;
  guardianDetails: string;
  curriculum: string;
  subjects: string[];
  learningMode: string;
  classType: string;
  additionalNotes: string;
  status: ApplicationStatus;
  adminNotes: string;
  submittedAt: string;
}

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "applications.json");

const SAMPLE_APPLICATIONS: StudentApplication[] = [
  {
    id: "APP-1001",
    name: "Kavindu Perera",
    email: "kavindu.perera@gmail.com",
    contactNumber: "+94 77 123 4567",
    age: "17",
    schoolOrBusiness: "Ananda College, Colombo",
    city: "Colombo",
    guardianDetails: "Sunil Perera (Father) - +94 71 987 6543",
    curriculum: "Edexcel (UK Curriculum)",
    subjects: ["Information Technology (A/L)", "Computer Science"],
    learningMode: "Online",
    classType: "Individual",
    additionalNotes: "Looking for intensive exam preparation for May/June series.",
    status: "Pending",
    adminNotes: "Scheduled initial consultation call via WhatsApp.",
    submittedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
  {
    id: "APP-1002",
    name: "Dilini Fernando",
    email: "dilini.f@hotmail.com",
    contactNumber: "+94 76 890 1234",
    age: "16",
    schoolOrBusiness: "Visakha Vidyalaya",
    city: "Colombo",
    guardianDetails: "Nirosha Fernando (Mother) - +94 77 456 7890",
    curriculum: "Local Curriculum (English Medium)",
    subjects: ["ICT (GCE O/L)", "Spoken English & Communication"],
    learningMode: "Physical / In-Person",
    classType: "Small Group",
    additionalNotes: "Wants weekend morning sessions if possible.",
    status: "Under Review",
    adminNotes: "Assigned to Senior ICT Lecturer.",
    submittedAt: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
  },
  {
    id: "APP-1003",
    name: "Tariq Mansoor",
    email: "tariq.mansoor@techcorp.lk",
    contactNumber: "+94 75 333 4444",
    age: "24",
    schoolOrBusiness: "Software Developer at CyberSoft",
    city: "Kandy",
    guardianDetails: "N/A (Self-sponsored)",
    curriculum: "Professional & Corporate Programs",
    subjects: ["AI Literacy & Prompt Engineering", "Business & Career Consultancy"],
    learningMode: "Online",
    classType: "Individual",
    additionalNotes: "Interested in AI prompt engineering certification.",
    status: "Enrolled",
    adminNotes: "Batch #4 confirmed. Payment received.",
    submittedAt: new Date(Date.now() - 3600000 * 24 * 5).toISOString(),
  },
  {
    id: "APP-1004",
    name: "Senuri Jayasinghe",
    email: "senuri.j@yahoo.com",
    contactNumber: "+94 71 555 6677",
    age: "15",
    schoolOrBusiness: "Gateway College",
    city: "Negombo",
    guardianDetails: "Dr. K. Jayasinghe - +94 77 222 3344",
    curriculum: "Cambridge (UK Curriculum)",
    subjects: ["English Literature", "English Language"],
    learningMode: "Hybrid",
    classType: "Individual",
    additionalNotes: "Focusing on essay writing structure for IGCSE.",
    status: "Approved",
    adminNotes: "Tutor assigned. First class starting Monday.",
    submittedAt: new Date(Date.now() - 3600000 * 24 * 7).toISOString(),
  },
  {
    id: "APP-1005",
    name: "Rohan De Silva",
    email: "rohan.desilva@outlook.com",
    contactNumber: "+94 78 999 1122",
    age: "18",
    schoolOrBusiness: "St. Peter's College",
    city: "Colombo",
    guardianDetails: "Priyanthi De Silva - +94 76 111 2233",
    curriculum: "Local Curriculum (English Medium)",
    subjects: ["General English (GCE A/L)", "Information Technology (A/L)"],
    learningMode: "Online",
    classType: "Small Group",
    additionalNotes: "",
    status: "Contacted",
    adminNotes: "Sent course brochure and fee structure.",
    submittedAt: new Date(Date.now() - 3600000 * 24 * 10).toISOString(),
  },
];

let memoryStore: StudentApplication[] | null = null;

// Helper to map DB row object to StudentApplication
function mapDbRowToApp(row: any): StudentApplication {
  let parsedSubjects: string[] = [];
  try {
    if (row.subjects) {
      if (typeof row.subjects === "string") {
        if (row.subjects.startsWith("[")) {
          parsedSubjects = JSON.parse(row.subjects);
        } else {
          parsedSubjects = row.subjects.split(",").map((s: string) => s.trim());
        }
      } else if (Array.isArray(row.subjects)) {
        parsedSubjects = row.subjects;
      }
    }
  } catch {
    parsedSubjects = row.subjects ? [String(row.subjects)] : [];
  }

  return {
    id: row.id,
    name: row.name || "",
    email: row.email || "",
    contactNumber: row.contact_number || row.contactNumber || "",
    age: row.age || "",
    schoolOrBusiness: row.school_or_business || row.schoolOrBusiness || "",
    city: row.city || "",
    guardianDetails: row.guardian_details || row.guardianDetails || "",
    curriculum: row.curriculum || "General",
    subjects: parsedSubjects,
    learningMode: row.learning_mode || row.learningMode || "Online",
    classType: row.class_type || row.classType || "Individual",
    additionalNotes: row.additional_notes || row.additionalNotes || "",
    status: row.status || "Pending",
    adminNotes: row.admin_notes || row.adminNotes || "",
    submittedAt: row.submitted_at
      ? new Date(row.submitted_at).toISOString()
      : row.submittedAt || new Date().toISOString(),
  };
}

// Local JSON File operations
function ensureLocalDataFile(): StudentApplication[] {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify(SAMPLE_APPLICATIONS, null, 2), "utf-8");
      return SAMPLE_APPLICATIONS;
    }
    const fileContent = fs.readFileSync(DATA_FILE, "utf-8");
    const parsed = JSON.parse(fileContent);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch (err) {
    console.error("Local data file error:", err);
  }
  return SAMPLE_APPLICATIONS;
}

function writeLocalDataFile(apps: StudentApplication[]): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(apps, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing local file backup:", err);
  }
}

export async function getAllApplications(): Promise<StudentApplication[]> {
  // 1. Try MySQL Database
  const rows = await executeQuery<any[]>("SELECT * FROM student_applications ORDER BY submitted_at DESC");
  if (rows && Array.isArray(rows) && rows.length > 0) {
    const dbApps = rows.map(mapDbRowToApp);
    memoryStore = dbApps;
    writeLocalDataFile(dbApps);
    return dbApps;
  }

  // 2. Fallback to Local Store
  if (!memoryStore) {
    memoryStore = ensureLocalDataFile();
  }
  return memoryStore;
}

export async function getApplicationById(id: string): Promise<StudentApplication | undefined> {
  const rows = await executeQuery<any[]>("SELECT * FROM student_applications WHERE id = ?", [id]);
  if (rows && Array.isArray(rows) && rows.length > 0) {
    return mapDbRowToApp(rows[0]);
  }

  const all = await getAllApplications();
  return all.find((app) => app.id === id);
}

export async function addApplication(
  data: Omit<StudentApplication, "id" | "status" | "adminNotes" | "submittedAt"> & {
    id?: string;
    submittedAt?: string;
  }
): Promise<StudentApplication> {
  const currentApps = await getAllApplications();
  const nextNumber =
    currentApps.length > 0
      ? Math.max(...currentApps.map((a) => parseInt(a.id.replace("APP-", "")) || 1000)) + 1
      : 1001;

  const id = data.id || `APP-${nextNumber}`;
  const submittedAt = data.submittedAt || new Date().toISOString();
  const subjectsArray = Array.isArray(data.subjects) ? data.subjects : data.subjects ? [data.subjects] : [];
  const subjectsJson = JSON.stringify(subjectsArray);

  const newApp: StudentApplication = {
    id,
    name: data.name || "",
    email: data.email || "",
    contactNumber: data.contactNumber || "",
    age: data.age || "",
    schoolOrBusiness: data.schoolOrBusiness || "",
    city: data.city || "",
    guardianDetails: data.guardianDetails || "",
    curriculum: data.curriculum || "General",
    subjects: subjectsArray,
    learningMode: data.learningMode || "Online",
    classType: data.classType || "Individual",
    additionalNotes: data.additionalNotes || "",
    status: "Pending",
    adminNotes: "",
    submittedAt,
  };

  // Try Insert to MySQL
  await executeQuery(
    `INSERT INTO student_applications 
     (id, name, email, contact_number, age, school_or_business, city, guardian_details, curriculum, subjects, learning_mode, class_type, additional_notes, status, admin_notes, submitted_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      newApp.id,
      newApp.name,
      newApp.email,
      newApp.contactNumber,
      newApp.age,
      newApp.schoolOrBusiness,
      newApp.city,
      newApp.guardianDetails,
      newApp.curriculum,
      subjectsJson,
      newApp.learningMode,
      newApp.classType,
      newApp.additionalNotes,
      newApp.status,
      newApp.adminNotes,
      new Date(submittedAt),
    ]
  );

  // Update local memory and JSON backup
  memoryStore = [newApp, ...currentApps];
  writeLocalDataFile(memoryStore);

  return newApp;
}

export async function updateApplication(
  id: string,
  updates: Partial<Pick<StudentApplication, "status" | "adminNotes" | "name" | "email" | "contactNumber">>
): Promise<StudentApplication | null> {
  const currentApp = await getApplicationById(id);
  if (!currentApp) return null;

  const updatedApp: StudentApplication = {
    ...currentApp,
    ...updates,
  };

  // Try MySQL Update
  const updateFields: string[] = [];
  const queryParams: any[] = [];

  if (updates.status !== undefined) {
    updateFields.push("status = ?");
    queryParams.push(updates.status);
  }
  if (updates.adminNotes !== undefined) {
    updateFields.push("admin_notes = ?");
    queryParams.push(updates.adminNotes);
  }
  if (updates.name !== undefined) {
    updateFields.push("name = ?");
    queryParams.push(updates.name);
  }
  if (updates.email !== undefined) {
    updateFields.push("email = ?");
    queryParams.push(updates.email);
  }
  if (updates.contactNumber !== undefined) {
    updateFields.push("contact_number = ?");
    queryParams.push(updates.contactNumber);
  }

  if (updateFields.length > 0) {
    queryParams.push(id);
    await executeQuery(
      `UPDATE student_applications SET ${updateFields.join(", ")} WHERE id = ?`,
      queryParams
    );
  }

  // Update local store
  const all = await getAllApplications();
  const index = all.findIndex((a) => a.id === id);
  if (index !== -1) {
    all[index] = updatedApp;
    memoryStore = [...all];
    writeLocalDataFile(memoryStore);
  }

  return updatedApp;
}

export async function deleteApplication(id: string): Promise<boolean> {
  await executeQuery("DELETE FROM student_applications WHERE id = ?", [id]);

  const all = await getAllApplications();
  const filtered = all.filter((a) => a.id !== id);
  memoryStore = filtered;
  writeLocalDataFile(filtered);

  return true;
}

export async function resetToSampleData(): Promise<StudentApplication[]> {
  // Clear MySQL table & seed sample applications
  await executeQuery("TRUNCATE TABLE student_applications");
  for (const sample of SAMPLE_APPLICATIONS) {
    await executeQuery(
      `INSERT INTO student_applications 
       (id, name, email, contact_number, age, school_or_business, city, guardian_details, curriculum, subjects, learning_mode, class_type, additional_notes, status, admin_notes, submitted_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        sample.id,
        sample.name,
        sample.email,
        sample.contactNumber,
        sample.age,
        sample.schoolOrBusiness,
        sample.city,
        sample.guardianDetails,
        sample.curriculum,
        JSON.stringify(sample.subjects),
        sample.learningMode,
        sample.classType,
        sample.additionalNotes,
        sample.status,
        sample.adminNotes,
        new Date(sample.submittedAt),
      ]
    );
  }

  memoryStore = [...SAMPLE_APPLICATIONS];
  writeLocalDataFile(memoryStore);
  return memoryStore;
}
