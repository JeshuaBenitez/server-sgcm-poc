// agenda/IAgendaService.ts
export interface IAgendaService {
    verificarDisponibilidad(fecha: string, medicoId?: number): Promise<boolean>;
  }
  