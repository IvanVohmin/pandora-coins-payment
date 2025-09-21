import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema";

declare global {
  var db: ReturnType<typeof createDbClient> | undefined;
}

function createDbClient() {
  console.log("🚀 Creating new MySQL connection pool");


  const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  return drizzle(pool, { schema, mode: 'default' });
}

const db = globalThis.db ?? createDbClient();

// Кэшируем в dev, чтобы HMR не создавал новые пулы
if (process.env.NODE_ENV !== "production") {
  globalThis.db = db;
}

export { db };
