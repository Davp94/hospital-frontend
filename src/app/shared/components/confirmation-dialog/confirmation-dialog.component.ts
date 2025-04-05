import { CommonModule } from '@angular/common';
import { Component, Inject, Input, Optional } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.scss'
})
export class ConfirmationDialogComponent {

  constructor(
    protected dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) protected data: any
  ){
  }

  closeDialog(): void {
    this.dialogRef.close(false)
  }

  confirmDialog(): void {
    this.dialogRef.close(true)
  }
}
