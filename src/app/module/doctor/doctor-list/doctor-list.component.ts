import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { DoctorService } from '../../../core/service/doctor.service';
import { DoctorDto } from '../../../core/dto/doctor.dto';
import { AppStore } from '../../../state-management/state.store';

@Component({
  selector: 'app-doctor-list',
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './doctor-list.component.html',
  styleUrl: './doctor-list.component.scss'
})
export class DoctorListComponent implements OnInit{

  doctores: DoctorDto[] = [];
  store = inject(AppStore);
  constructor(private doctorService: DoctorService){}

  ngOnInit(): void {
    this.loadDoctores();
  }

  loadDoctores(){
    this.doctorService.getDoctorByEspecialidad(this.store.espId() as number).subscribe({
      next: (res: DoctorDto[]) => this.doctores = res,
      error: (err: any) => console.log(err)
    })
  }

}
