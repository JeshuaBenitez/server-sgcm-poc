import express from "express";
import cors from "cors";
import pacientesRouter from "./pacientes.router.js";
import { bootstrap } from "./db.js";

const app = express();
app.use(cors({ origin: "http://localhost:5173" })); // front vite
app.use(express.json());

app.get("/", (_, res) => res.send("SGCM API OK"));
app.use("/pacientes", pacientesRouter);

const PORT = 3000;
bootstrap().then(() => {
  app.listen(PORT, () => console.log(`API http://localhost:${PORT}`));
}).catch((err) => {
  console.error("Error al iniciar:", err);
  process.exit(1);
});
