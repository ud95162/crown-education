import mysql, { Pool } from "mysql2/promise";

let pool: Pool | null = null;
let isDbInitialized = false;

export function getMySQLPool(): Pool {
  if (pool) return pool;

  const connectionString = process.env.DATABASE_URL;

  if (connectionString) {
    pool = mysql.createPool(connectionString);
  } else {
    pool = mysql.createPool({
      host: process.env.MYSQL_HOST || "localhost",
      port: Number(process.env.MYSQL_PORT) || 3306,
      user: process.env.MYSQL_USER || "root",
      password: process.env.MYSQL_PASSWORD || "",
      database: process.env.MYSQL_DATABASE || "maku_education",
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }

  return pool;
}

export async function initDatabase(): Promise<boolean> {
  if (isDbInitialized) return true;

  try {
    const dbPool = getMySQLPool();

    // Create table if it doesn't exist
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS student_applications (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255),
        contact_number VARCHAR(100) NOT NULL,
        age VARCHAR(50),
        school_or_business VARCHAR(255),
        city VARCHAR(100),
        guardian_details TEXT,
        curriculum VARCHAR(150),
        subjects TEXT,
        learning_mode VARCHAR(100),
        class_type VARCHAR(100),
        additional_notes TEXT,
        status VARCHAR(50) DEFAULT 'Pending',
        admin_notes TEXT,
        submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `;

    await dbPool.query(createTableQuery);
    isDbInitialized = true;
    console.log("✅ MySQL Database initialized successfully: table 'student_applications' ready.");
    return true;
  } catch (err: any) {
    console.warn("⚠️ MySQL Database initialization error (falling back to JSON store):", err?.message || err);
    return false;
  }
}

export async function executeQuery<T = any>(sql: string, params: any[] = []): Promise<T | null> {
  try {
    await initDatabase();
    const dbPool = getMySQLPool();
    const [rows] = await dbPool.query(sql, params);
    return rows as T;
  } catch (err: any) {
    console.warn("⚠️ MySQL Query execution warning:", err?.message || err);
    return null;
  }
}
