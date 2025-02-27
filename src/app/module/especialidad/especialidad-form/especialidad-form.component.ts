import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EspecialidadService } from '../../../core/service/especialidad.service';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-especialidad-form',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatInputModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './especialidad-form.component.html',
  styleUrl: './especialidad-form.component.scss'
})
export class EspecialidadFormComponent {

  especialidadService = inject(EspecialidadService);
  especialidadForm: FormGroup;
  constructor(private formBuilder: FormBuilder){
    this.especialidadForm = this.formBuilder.group({
      id: [],
      espNombre: ['', [Validators.required, Validators.maxLength(10)]],
      espDescripcion: ['', Validators.required]
    })
  }
}
