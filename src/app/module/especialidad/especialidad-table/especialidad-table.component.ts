import {AfterViewInit, Component, effect, inject, input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { EspecialidadService } from '../../../core/service/especialidad.service';
import { EspecialidadDto } from '../../../core/dto/especialidad.dto';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { OperationEnum } from '../../../shared/enum/operation.enum';
import { Router } from '@angular/router';
import { AppStore } from '../../../state-management/state.store';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'especialidad-table',
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatIconModule, MatButtonModule],
  templateUrl: './especialidad-table.component.html',
  styleUrl: './especialidad-table.component.scss'
})
export class EspecialidadTableComponent implements AfterViewInit, OnInit, OnDestroy{

  displayedColumns: string[] = ['id', 'espNombre', 'espDescripcion', 'acciones'];
  dataSource = new MatTableDataSource<EspecialidadDto>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  operationType: typeof OperationEnum = OperationEnum;
  createdData = input<boolean>(false);
  store = inject(AppStore);

  constructor(private especialidadService: EspecialidadService, private router: Router){
    effect(() => {
      if(this.createdData()){
        this.loadEspecialidades();
      }
    })
    console.log(this.store.userData());
    const userData = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData') || '') : ''
    if(userData){
      this.store.addUserData(userData)
    }
  }
  ngOnDestroy(): void {
    if(this.store.userData()){
      localStorage.setItem("userData", JSON.stringify(this.store.userData()))
    }
  }

  ngOnInit(): void {
    this.loadEspecialidades();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadEspecialidades(){
    this.especialidadService.getEspecialidades().subscribe({
      next: (res: EspecialidadDto[]) => {
        this.dataSource.data = res;
      },
      error: err => console.log(err)
    })
  }

  operation(especialidad: EspecialidadDto, operationType?: OperationEnum){
    console.log(operationType)
    if(operationType){
      switch(operationType){
        case OperationEnum.CREATE:

        break;
        case OperationEnum.UPDATE:
          this.router.navigateByUrl(`especialidad/form/${especialidad.espId}/operation/${operationType}`);
        break;
        case OperationEnum.DELETE:
        case OperationEnum.READ:
          this.router.navigateByUrl(`especialidad/view/${especialidad.espId}/operation/${operationType}`);
        break;
        default: throw new Error("Operacion no permitida")
      }
    }else {
      this.store.addEspecialidadData(especialidad);
      this.router.navigateByUrl("/doctores");
    }
    //this.router.navigate("");
  }
}
