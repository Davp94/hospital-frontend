import { Routes } from '@angular/router';
import { EspecialidadComponent } from './module/especialidad/especialidad.component';
import { EspecialidadMainComponent } from './module/especialidad/especialidad-main/especialidad-main.component';
import { EspecialidadTableComponent } from './module/especialidad/especialidad-table/especialidad-table.component';
import { EspecialidadFormComponent } from './module/especialidad/especialidad-form/especialidad-form.component';
import { MainComponent } from './shared/components/main/main.component';
import { UsuarioComponent } from './module/usuario/usuario.component';
import { LoginComponent } from './module/login/login.component';
import { EspecialidadViewComponent } from './module/especialidad/especialidad-view/especialidad-view.component';
import { authGuard } from './core/guard/auth.guard';
import { IndexComponent } from './shared/components/index/index.component';
import { DoctorComponent } from './module/doctor/doctor.component';
import { DoctorListComponent } from './module/doctor/doctor-list/doctor-list.component';

export const routes: Routes = [
  {
    path: "",
    component: MainComponent,
    canActivate: [authGuard],
    children: [
      {
        path: "",
        component: IndexComponent
      },
      {
        path:"especialidad",
        component: EspecialidadComponent,
        children: [
          {
            path: "",
            component: EspecialidadMainComponent
          },
          {
            path: "view/:id/operation/:operation",
            component: EspecialidadViewComponent
          },
          {
            path: "form/:id/operation/:operation",
            component: EspecialidadFormComponent
          }
        ]
      },
      {
        path: "usuario",
        component: UsuarioComponent
      },
      {
        path: "doctores",
        component: DoctorComponent,
        children: [
          {
            path: "",
            component: DoctorListComponent
          }
        ]
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];
//localhost:4200/login --> guards
//localhost:4200/ -> main
