import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

export const pool = new Pool({
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT || 5432),
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
});

export async function bootstrap() {
  // habilita acceso al schema público
  await pool.query(`
    CREATE TABLE IF NOT EXISTS pacientes (
      id SERIAL PRIMARY KEY,
      nombre TEXT NOT NULL,
      fecha_nacimiento DATE NOT NULL,
      telefono TEXT NOT NULL
    );
  `);
}
