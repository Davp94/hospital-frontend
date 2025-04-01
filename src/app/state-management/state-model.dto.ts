import { EspecialidadDto } from "../core/dto/especialidad.dto";
import { PacienteDto } from "../core/dto/paciente.dto";

export type StateModelDto = {
  userData: PacienteDto | null,
  especialidad: EspecialidadDto | null,
  //fechaUltimaReservacion: Date,
}
