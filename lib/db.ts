import mysql, { Pool } from "mysql2/promise";

let pool: Pool | undefined;
let ready: Promise<void> | undefined;

export function databaseConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL || process.env.MYSQL_HOST);
}

function getPool(): Pool {
  if (!pool) {
    pool = process.env.DATABASE_URL
      ? mysql.createPool({ uri: process.env.DATABASE_URL, connectionLimit: 5 })
      : mysql.createPool({
          host: process.env.MYSQL_HOST,
          port: Number(process.env.MYSQL_PORT ?? 3306),
          user: process.env.MYSQL_USER,
          password: process.env.MYSQL_PASSWORD,
          database: process.env.MYSQL_DATABASE,
          connectionLimit: 5,
        });
  }
  return pool;
}

async function ensureSchema(): Promise<void> {
  await getPool().execute(`
    CREATE TABLE IF NOT EXISTS enquiries (
      id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(254) NOT NULL,
      phone VARCHAR(30) NOT NULL,
      service VARCHAR(100) NOT NULL,
      preferred_date VARCHAR(30),
      alternative_date VARCHAR(30),
      location VARCHAR(120),
      session_type VARCHAR(120),
      budget VARCHAR(80),
      contact_method VARCHAR(30),
      details TEXT,
      status VARCHAR(20) NOT NULL DEFAULT 'new',
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) CHARACTER SET utf8mb4
  `);
}

export type EnquiryRecord = {
  name: string;
  email: string;
  phone: string;
  service: string;
  preferredDate: string;
  alternativeDate: string;
  location: string;
  sessionType: string;
  budget: string;
  contactMethod: string;
  details: string;
};

export async function saveEnquiry(e: EnquiryRecord): Promise<void> {
  ready ??= ensureSchema().catch((error) => {
    ready = undefined;
    throw error;
  });
  await ready;
  await getPool().execute(
    `INSERT INTO enquiries (name, email, phone, service, preferred_date, alternative_date, location, session_type, budget, contact_method, details)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [e.name, e.email, e.phone, e.service, e.preferredDate, e.alternativeDate, e.location, e.sessionType, e.budget, e.contactMethod, e.details],
  );
}

export const enquiryStatuses = ["new", "contacted", "booked", "closed"] as const;
export type EnquiryStatus = (typeof enquiryStatuses)[number];

export type StoredEnquiry = {
  id: number;
  name: string;
  email: string;
  phone: string;
  service: string;
  preferred_date: string | null;
  alternative_date: string | null;
  location: string | null;
  session_type: string | null;
  budget: string | null;
  contact_method: string | null;
  details: string | null;
  status: EnquiryStatus;
  created_at: string;
};

async function ready_(): Promise<void> {
  ready ??= ensureSchema().catch((error) => {
    ready = undefined;
    throw error;
  });
  await ready;
}

export async function listEnquiries(status?: string): Promise<StoredEnquiry[]> {
  await ready_();
  const filter = enquiryStatuses.includes(status as EnquiryStatus);
  const [rows] = await getPool().query(
    `SELECT id, name, email, phone, service, preferred_date, alternative_date, location, session_type, budget, contact_method, details, status,
            DATE_FORMAT(created_at, '%Y-%m-%d %H:%i') AS created_at
     FROM enquiries ${filter ? "WHERE status = ?" : ""} ORDER BY id DESC LIMIT 200`,
    filter ? [status] : [],
  );
  return rows as StoredEnquiry[];
}

export async function updateEnquiryStatus(id: number, status: EnquiryStatus): Promise<void> {
  await ready_();
  await getPool().execute("UPDATE enquiries SET status = ? WHERE id = ?", [status, id]);
}
