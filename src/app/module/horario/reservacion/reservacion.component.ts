import { Component, inject, OnInit } from '@angular/core';
import { HorarioService } from '../../../core/service/horario.service';
import { ReservacionService } from '../../../core/service/reservacion.service';
import { CommonModule } from '@angular/common';
import { AppStore } from '../../../state-management/state.store';
import { HorarioDto } from '../../../core/dto/horario.dto';
import { ReservacionRequestDto } from '../../../core/dto/reservacion-request.dto';
import { ReservacionDto } from '../../../core/dto/reservacion.dto';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-reservacion',
  imports: [CommonModule, MatCardModule, MatButtonModule, ConfirmationDialogComponent, MatDialogModule],
  templateUrl: './reservacion.component.html',
  styleUrl: './reservacion.component.scss'
})
export class ReservacionComponent implements OnInit {
  horarios: HorarioDto[] = []
  store =inject(AppStore);
  constructor(private horarioService: HorarioService, private reservacionService: ReservacionService, private matDialog: MatDialog) {

  }

  ngOnInit(): void {
    this.loadHorarios();
  }

  loadHorarios(){
     this.horarioService.getHorariosByFecha('', true, this.store.docId() as number).subscribe({
          next: (res: HorarioDto[]) => {
            this.horarios = res
          },
          error: (err: any) => console.log(err)
        })
  }

  realizarReservacion(horario: HorarioDto) {
     const dialogRef = this.matDialog.open(ConfirmationDialogComponent, { data: {title: 'Esta seguro de realizar la reservacion?', subtitle: 'Seleccione el boton de Confirmar para realizar la reservacion'}});
        dialogRef.afterClosed().subscribe((response: boolean) => {
          if(response){
            const data:  ReservacionRequestDto = {
              docId: horario.docId,
              horId: horario.id,
              pacId: this.store.userData()?.pacId as number
           }
           this.reservacionService.createReservacion(data).subscribe({
             next: (res: ReservacionDto) => console.log(res),
             error: (err: any) => console.log(err)
           })
          }
        })
  }
}
