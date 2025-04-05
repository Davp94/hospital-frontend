export interface HorarioDto{
  id: number;
  horFecha : Date;
  horHoraInicio: string;
  horHoraFin: string;
  horDisponible: boolean;
  docId: number;
}
