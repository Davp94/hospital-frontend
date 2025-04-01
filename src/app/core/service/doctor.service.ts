import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DoctorDto } from '../dto/doctor.dto';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private httpClient: HttpClient) { }

   getDoctorByEspecialidad(espId: number): Observable<DoctorDto[]> {
      return this.httpClient.get<DoctorDto[]>("http://localhost:9700/doctor", {params: {espId: espId} })
  }
}
