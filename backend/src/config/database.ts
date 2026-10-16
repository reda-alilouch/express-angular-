import mysql from "mysql2/promise";

const requiredEnv = ["DB_HOST", "DB_USER", "DB_NAME", "DB_PORT"] as const;

for (const key of requiredEnv) {
  if (!process.env[key]) {
    throw new Error(`Variable d'environnement manquante : ${key}`);
  }
}

const dbPort = Number(process.env.DB_PORT);

if (!Number.isInteger(dbPort) || dbPort <= 0 || dbPort > 65535) {
  throw new Error("DB_PORT doit être un entier valide entre 1 et 65535.");
}

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: dbPort,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Tester la connexion à MySQL
export async function testConnection(): Promise<void> {
  let connection: mysql.PoolConnection | undefined;

  try {
    connection = await pool.getConnection();
    await connection.ping();
    console.log("Connexion à MySQL réussie !");
  } catch (error) {
    console.error("Erreur de connexion à MySQL :", error);
    throw error;
  } finally {
    connection?.release();
  }
}

export default pool;
