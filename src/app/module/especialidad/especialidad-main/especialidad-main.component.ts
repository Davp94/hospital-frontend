import { Component, inject, signal } from '@angular/core';
import { EspecialidadTableComponent } from "../especialidad-table/especialidad-table.component";
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { EspecialidadFormComponent } from '../especialidad-form/especialidad-form.component';
import { AppStore } from '../../../state-management/state.store';

@Component({
  selector: 'app-especialidad-main',
  imports: [EspecialidadTableComponent, CommonModule, MatButtonModule, ],
  templateUrl: './especialidad-main.component.html',
  styleUrl: './especialidad-main.component.scss'
})
export class EspecialidadMainComponent {

  createdData = signal<boolean>(false);
  store = inject(AppStore)
  constructor(private matDialog: MatDialog){}

  createEspecialidad(){
    const dialogRef = this.matDialog.open(EspecialidadFormComponent, {});
    dialogRef.afterClosed().subscribe((response: boolean) => {
      if(response){
        this.createdData.set(response);
      } else {
        this.createdData.set(false);
      }
    })
  }
}
