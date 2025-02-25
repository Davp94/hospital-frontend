import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {

  constructor(private httpClient: HttpClient) { }


  getEspecialidades(): Observable<any> {
    return this.httpClient.get<any>("http://localhost:9700/especialidad")
  }
}
