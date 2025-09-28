// administracion/admin.router.ts
import { Router } from "express";
const r = Router();
r.get("/estadisticas", (_req,res)=> res.json({ message:"Admin stub OK" }));
export default r;
