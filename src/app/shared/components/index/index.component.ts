import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { PacienteService } from '../../../core/service/paciente.service';
import { PacienteDto } from '../../../core/dto/paciente.dto';
import { AppStore } from '../../../state-management/state.store';

@Component({
  selector: 'app-index',
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent implements OnInit{
  store = inject(AppStore);
  constructor(private pacienteService: PacienteService){}
  ngOnInit(): void {
    this.pacienteService.getPacienteData().subscribe({
      next: (res: PacienteDto) => this.store.addUserData(res),
    })
  }


}
