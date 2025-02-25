import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EspecialidadTableComponent } from "./especialidad-table/especialidad-table.component";

@Component({
  selector: 'app-especialidad',
  imports: [RouterOutlet, EspecialidadTableComponent],
  templateUrl: './especialidad.component.html',
  styleUrl: './especialidad.component.scss'
})
export class EspecialidadComponent {

}
