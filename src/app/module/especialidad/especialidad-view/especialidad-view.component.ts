import { CommonModule, Location } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { EspecialidadService } from '../../../core/service/especialidad.service';
import { EspecialidadDto } from '../../../core/dto/especialidad.dto';
import { OperationEnum } from '../../../shared/enum/operation.enum';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-especialidad-view',
  imports: [CommonModule, MatButtonModule],
  templateUrl: './especialidad-view.component.html',
  styleUrl: './especialidad-view.component.scss'
})
export class EspecialidadViewComponent implements OnInit, AfterViewInit {
  especialidad: EspecialidadDto = {} as EspecialidadDto;
  idEspecialidad: string | null = null;
  operation: string | null = null;
  operationType: typeof OperationEnum = OperationEnum;

  constructor(private especialidadService: EspecialidadService, protected location: Location, private activeRoute: ActivatedRoute){
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
        next: (res: EspecialidadDto) => this.especialidad = res,
        error: err => console.log(err),
        complete: () => console.log('completed observable')
      })
    }else {
      console.log('La especialidad es de valor nulo')
    }
  }

  ngAfterViewInit(): void {
    console.log('EXECUTING ON AFTER VIEW INIT')
  }

  deleteEspecialidad(){
    if(this.idEspecialidad != null){
      this.especialidadService.deleteEspecialidad(+this.idEspecialidad).subscribe({
        next: (res: any) => {
          console.log('Especialidad eliminada')
          this.location.back();
        },
        error: err => console.log(err),
        complete: () => console.log('coompleted observable')
      })
    } else {
      console.log('La especialidad es de valor nulo')
    }
  }

  get validOperation(): number{
    if(this.operation){
      return +this.operation
    }else {
      return 0
    }
  }
}
