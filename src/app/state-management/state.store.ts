import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { StateModelDto } from "./state-model.dto"
import { computed } from '@angular/core';
import { PacienteDto } from '../core/dto/paciente.dto';
import { EspecialidadDto } from '../core/dto/especialidad.dto';
import { DoctorDto } from '../core/dto/doctor.dto';

type AppState = {
  stateApp: StateModelDto,
}

const initialState: AppState = {
  stateApp: {
    userData: null,
    especialidad: null,
    doctor: null,
  },
}

export const AppStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({stateApp}) => ({
    userData: computed(()=> stateApp.userData()),
    espId: computed(() => stateApp.especialidad()?.espId),
    docId: computed(() => stateApp.doctor()?.docId)
  })),
  withMethods(store => ({
    addUserData(userData: PacienteDto){
      patchState(store, {
        stateApp: {
          ...store.stateApp(),
          userData: userData
        }
      })
    },
    addEspecialidadData(especialidad: EspecialidadDto){
      patchState(store, {
        stateApp: {
          ...store.stateApp(),
          especialidad: especialidad
        }
      })
    },
    restartState() {
      patchState(store, {
        stateApp: {
          userData: null,
          especialidad: null,
          doctor: null,
        }
      })
    },
    addDoctor(doctor: DoctorDto){
      patchState(store, {
        stateApp: {
          ...store.stateApp(),
          doctor: doctor
        }
      })
    },
  }),
))
