import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HorarioDto } from '../dto/horario.dto';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {

  private apiUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }

  getHorariosByFecha(horFecha: string, disponible: boolean = true, docId: number): Observable<HorarioDto[]> {
    return this.httpClient.get<HorarioDto[]>(`${this.apiUrl}/horario`, {params:
      {
        horFecha: horFecha,
        disponible: disponible,
        docId: docId
      }
    });
  }

  getHorariosByMes(mes: number, disponible: boolean = true, docId: number): Observable<HorarioDto[]> {
    return this.httpClient.get<HorarioDto[]>(`${this.apiUrl}/horario/mes`, {params:
      {
        mes: mes,
        disponible: disponible,
        docId: docId
      }
    });
  }
}
