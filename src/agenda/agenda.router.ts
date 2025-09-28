// agenda/agenda.router.ts
import { Router } from "express";
const r = Router();
/** Stub para modularidad: expone API pero no implementa lógica de negocio */
r.get("/disponibilidad", (_req,res)=> res.json({ message:"Agenda stub OK" }));
export default r;
