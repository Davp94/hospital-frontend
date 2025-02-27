import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EspecialidadDto } from '../dto/especialidad.dto';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {

  constructor(private httpClient: HttpClient) { }


  getEspecialidades(): Observable<EspecialidadDto[]> {
    return this.httpClient.get<EspecialidadDto[]>("http://localhost:9700/especialidad")
  }

  getEspecialidadById(id: number): Observable<EspecialidadDto> {
    return this.httpClient.get<EspecialidadDto>(`http://localhost:9700/especialidad/${id}`)
  }

  createEspecialidad(especialidadDto: EspecialidadDto): Observable<EspecialidadDto> {
    return this.httpClient.post<EspecialidadDto>(`http://localhost:9700/especialidad`, especialidadDto)
  }

  updateEspecialidad(id: number,especialidadDto: EspecialidadDto): Observable<EspecialidadDto> {
    return this.httpClient.put<EspecialidadDto>(`http://localhost:9700/especialidad/${id}`, especialidadDto)
  }

  deleteEspecialidad(id: number): Observable<EspecialidadDto> {
    return this.httpClient.delete<EspecialidadDto>(`http://localhost:9700/especialidad/${id}`)
  }

}
