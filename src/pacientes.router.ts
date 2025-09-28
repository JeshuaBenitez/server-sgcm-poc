import { Router } from "express";
import { pool } from "./db.js";
import { PacienteSchema } from "./tipos.js";

const r = Router();

// CREATE
r.post("/", async (req, res) => {
  const parse = PacienteSchema.omit({ id: true }).safeParse(req.body);
  if (!parse.success) return res.status(400).json({ errors: parse.error.issues });
  const p = parse.data;
  const sql = `
    INSERT INTO pacientes (nombre, fecha_nacimiento, telefono)
    VALUES ($1, $2, $3) RETURNING id
  `;
  const { rows } = await pool.query(sql, [p.nombre, p.fechaNacimiento, p.telefono]);
  res.status(201).json({ id: rows[0].id });
});

// READ by id
r.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { rows } = await pool.query(
    `SELECT id, nombre, to_char(fecha_nacimiento,'YYYY-MM-DD') AS "fechaNacimiento", telefono
     FROM pacientes WHERE id=$1`,
    [id]
  );
  res.json(rows[0] ?? null);
});

// UPDATE
r.put("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const parse = PacienteSchema.omit({ id: true }).safeParse(req.body);
  if (!parse.success) return res.status(400).json({ errors: parse.error.issues });
  const p = parse.data;
  const { rowCount } = await pool.query(
    "UPDATE pacientes SET nombre=$1, fecha_nacimiento=$2, telefono=$3 WHERE id=$4",
    [p.nombre, p.fechaNacimiento, p.telefono, id]
  );
  if (rowCount === 0) return res.status(404).json({ error: "No encontrado" });
  res.sendStatus(204);
});

// DELETE
r.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { rowCount } = await pool.query("DELETE FROM pacientes WHERE id=$1", [id]);
  if (rowCount === 0) return res.status(404).json({ error: "No encontrado" });
  res.sendStatus(204);
});

// LIST / SEARCH
r.get("/", async (req, res) => {
  const q = (req.query.query as string | undefined)?.toLowerCase().trim() || "";
  if (q) {
    const { rows } = await pool.query(
      `SELECT id, nombre, to_char(fecha_nacimiento,'YYYY-MM-DD') AS "fechaNacimiento", telefono
       FROM pacientes
       WHERE LOWER(nombre) LIKE $1 OR telefono LIKE $1
       ORDER BY id DESC`,
      [`%${q}%`]
    );
    return res.json(rows);
  }
  const { rows } = await pool.query(
    `SELECT id, nombre, to_char(fecha_nacimiento,'YYYY-MM-DD') AS "fechaNacimiento", telefono
     FROM pacientes ORDER BY id DESC`
  );
  res.json(rows);
});

export default r;
