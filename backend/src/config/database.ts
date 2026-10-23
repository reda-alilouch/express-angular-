
import { Sequelize } from "sequelize";

const {
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
} = process.env;

if (!DB_NAME || !DB_USER || !DB_HOST) {
  throw new Error("Variables de configuration MySQL manquantes.");
}

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD ?? "", {
  host: DB_HOST,
  port: Number(DB_PORT) || 3306,
  dialect: "mysql",
  logging: false,

  define: {
    underscored: true,
    timestamps: true,
  },

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export async function testConnection(): Promise<void> {
  try {
    await sequelize.authenticate();
    console.log("Connexion à MySQL réussie !");
  } catch (error) {
    console.error("Erreur de connexion à MySQL :", error);
    throw error;
  }
}
