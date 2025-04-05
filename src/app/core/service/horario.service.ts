import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HorarioDto } from '../dto/horario.dto';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {

  constructor(private httpClient: HttpClient) { }

  getHorariosByFecha(horFecha: string, disponible: boolean = true, docId: number): Observable<HorarioDto[]> {
    return this.httpClient.get<HorarioDto[]>(`http://localhost:9700/horario`, {params:
      {
        horFecha: horFecha,
        disponible: disponible,
        docId: docId
      }
    });
  }

  getHorariosByMes(mes: number, disponible: boolean = true, docId: number): Observable<HorarioDto[]> {
    return this.httpClient.get<HorarioDto[]>(`http://localhost:9700/horario`, {params:
      {
        mes: mes,
        disponible: disponible,
        docId: docId
      }
    });
  }
}
