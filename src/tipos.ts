import { z } from "zod";

const NAME_RE = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ ]+$/;
const PHONE_RE = /^\+52\d{10}$/;

export const PacienteSchema = z.object({
  id: z.number().int().positive().optional(),
  nombre: z.string()
    .trim()
    .min(2, "El nombre debe tener al menos 2 caracteres.")
    .max(80, "El nombre no debe superar 80 caracteres.")
    .regex(NAME_RE, "El nombre solo puede contener letras y espacios."),
  fechaNacimiento: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de fecha inválido (YYYY-MM-DD).")
    .refine((s) => s <= new Date().toISOString().slice(0,10), {
      message: "La fecha de nacimiento no puede ser posterior a hoy."
    }),
  telefono: z.string()
    .trim()
    .regex(PHONE_RE, "El teléfono debe tener el formato +52##########."),
});
export type Paciente = z.infer<typeof PacienteSchema>;
