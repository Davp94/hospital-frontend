import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PacienteDto } from '../dto/paciente.dto';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  constructor(private httpClient: HttpClient) {}

  getPacienteData(): Observable<PacienteDto[]>{
    return this.httpClient.get<PacienteDto[]>('http://localhost:9700/paciente')
  }
}
