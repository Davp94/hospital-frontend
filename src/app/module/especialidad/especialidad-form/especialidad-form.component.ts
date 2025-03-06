import { CommonModule, Location } from '@angular/common';
import { Component, Inject, inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EspecialidadService } from '../../../core/service/especialidad.service';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { EspecialidadDto } from '../../../core/dto/especialidad.dto';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-especialidad-form',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatInputModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './especialidad-form.component.html',
  styleUrl: './especialidad-form.component.scss'
})
export class EspecialidadFormComponent {

  especialidadService = inject(EspecialidadService);
  especialidadForm: FormGroup;
  idEspecialidad: string | null = null;
  operation: string | null = null;

  constructor(private formBuilder: FormBuilder,
    protected location: Location,
    private activeRoute: ActivatedRoute,
    @Optional() protected dialogRef: MatDialogRef<EspecialidadFormComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) data: EspecialidadDto){
    this.especialidadForm = this.formBuilder.group({
      espId: [],
      espNombre: ['', [Validators.required, Validators.maxLength(10)]],
      espDescripcion: ['', Validators.required]
    })
    console.log('EXCUTING CONSTRUCTOR');
    this.activeRoute.paramMap.subscribe(params => {
      this.idEspecialidad = params.get('id');
      this.operation = params.get('operation');
    })
  }

  ngOnInit(): void {
      console.log('EXECUTING ON INIT')
      if(this.idEspecialidad != null){
        this.especialidadService.getEspecialidadById(+this.idEspecialidad).subscribe({
          next: (res: EspecialidadDto) => this.parseFormValue(res),
          error: err => console.log(err),
          complete: () => console.log('completed observable')
        })
      }else {
        console.log('La especialidad es de valor nulo')
      }
  }

  parseFormValue(especialidadData : EspecialidadDto){
    this.especialidadForm.get('espId')?.setValue(especialidadData.espId);
    this.especialidadForm.get('espNombre')?.setValue(especialidadData.espNombre);
    this.especialidadForm.get('espDescripcion')?.setValue(especialidadData.espDescripcion);
  }


  updateEspecialidad(){
    const especilialidad: EspecialidadDto = {
      espNombre: this.especialidadForm.get('espNombre')?.value,
      espDescripcion: this.especialidadForm.get('espDescripcion')?.value,
    }
    this.especialidadService.updateEspecialidad(this.especialidadId, especilialidad).subscribe({
      next: (res: EspecialidadDto) => this.location.back(),
      error: err => console.log(err),
      complete: () => console.log('completed observable')
    })
  }

  crearEspecialidad(){
    const especilialidad: EspecialidadDto = {
      espNombre: this.especialidadForm.get('espNombre')?.value,
      espDescripcion: this.especialidadForm.get('espDescripcion')?.value,
    }
    this.especialidadService.createEspecialidad(especilialidad).subscribe({
      next: (res: EspecialidadDto) => this.dialogRef?.close(true),
      error: err => console.log(err),
      complete: () => console.log('completed observable')
    })
  }

  get especialidadId(): number{
    return this.especialidadForm.get('espId')?.value;
  }
}
