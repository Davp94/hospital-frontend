import {AfterViewInit, Component, effect, input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { EspecialidadService } from '../../../core/service/especialidad.service';
import { EspecialidadDto } from '../../../core/dto/especialidad.dto';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { OperationEnum } from '../../../shared/enum/operation.enum';
import { Router } from '@angular/router';
@Component({
  selector: 'especialidad-table',
  imports: [MatTableModule, MatPaginatorModule, MatIconModule, MatButtonModule],
  templateUrl: './especialidad-table.component.html',
  styleUrl: './especialidad-table.component.scss'
})
export class EspecialidadTableComponent implements AfterViewInit, OnInit{

  displayedColumns: string[] = ['id', 'espNombre', 'espDescripcion', 'acciones'];
  dataSource = new MatTableDataSource<EspecialidadDto>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  operationType: typeof OperationEnum = OperationEnum;
  createdData = input<boolean>(false);

  constructor(private especialidadService: EspecialidadService, private router: Router){
    effect(() => {
      if(this.createdData()){
        this.loadEspecialidades();
      }
    })
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

  operation(id: number, operationType: OperationEnum){
    console.log(operationType)
    //this.router.navigate("");
    switch(operationType){
      case OperationEnum.CREATE:

      break;
      case OperationEnum.UPDATE:
        this.router.navigateByUrl(`especialidad/form/${id}/operation/${operationType}`);
      break;
      case OperationEnum.DELETE:
      case OperationEnum.READ:
        this.router.navigateByUrl(`especialidad/view/${id}/operation/${operationType}`);
      break;
      default: throw new Error("Operacion no permitida")
    }

  }
}
