import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EspecialidadDto } from '../dto/especialidad.dto';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {

  private apiUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }


  getEspecialidades(): Observable<EspecialidadDto[]> {
    return this.httpClient.get<EspecialidadDto[]>(`${this.apiUrl}/especialidad`)
  }

  getEspecialidadById(id: number): Observable<EspecialidadDto> {
    return this.httpClient.get<EspecialidadDto>(`${this.apiUrl}/especialidad/${id}`)
  }

  createEspecialidad(especialidadDto: EspecialidadDto): Observable<EspecialidadDto> {
    return this.httpClient.post<EspecialidadDto>(`${this.apiUrl}/especialidad`, especialidadDto)
  }

  updateEspecialidad(id: number,especialidadDto: EspecialidadDto): Observable<EspecialidadDto> {
    return this.httpClient.put<EspecialidadDto>(`${this.apiUrl}/especialidad/${id}`, especialidadDto)
  }

  deleteEspecialidad(id: number): Observable<EspecialidadDto> {
    return this.httpClient.delete<EspecialidadDto>(`${this.apiUrl}/especialidad/${id}`)
  }

}
