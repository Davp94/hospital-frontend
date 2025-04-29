import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DoctorDto } from '../dto/doctor.dto';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private apiUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }

   getDoctorByEspecialidad(espId: number): Observable<DoctorDto[]> {
      return this.httpClient.get<DoctorDto[]>(`${this.apiUrl}/doctor`, {params: {espId: espId} })
  }
}
