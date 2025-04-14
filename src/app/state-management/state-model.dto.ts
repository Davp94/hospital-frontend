import { DoctorDto } from "../core/dto/doctor.dto";
import { EspecialidadDto } from "../core/dto/especialidad.dto";
import { PacienteDto } from "../core/dto/paciente.dto";

export type StateModelDto = {
  userData: PacienteDto | null,
  especialidad: EspecialidadDto | null,
  doctor: DoctorDto | null
  fechaReservacion: string | null
  //fechaUltimaReservacion: Date,
}
