import { HorarioDto } from "./horario.dto";

export interface ReservacionDto {
  horarioResponse: HorarioDto;

  docNombreCompleto: string;

  espNombre: string;

  resEstado: number;
}
