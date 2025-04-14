import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PacienteDto } from '../dto/paciente.dto';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private apiUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient) {}

  getPacienteData(): Observable<PacienteDto>{
    return this.httpClient.get<PacienteDto>(`${this.apiUrl}/paciente`)
  }
}
