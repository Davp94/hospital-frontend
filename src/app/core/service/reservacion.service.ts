import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReservacionRequestDto } from '../dto/reservacion-request.dto';
import { ReservacionDto } from '../dto/reservacion.dto';
import { Observable } from 'rxjs';
import { PaginationRequestDto } from '../dto/pagination-request.dto';
import { PaginationDto } from '../dto/pagination.dto';

@Injectable({
  providedIn: 'root'
})
export class ReservacionService {

  constructor(private httpClient: HttpClient) { }

  createReservacion(reservacionRequestDto: ReservacionRequestDto): Observable<ReservacionDto> {
    return this.httpClient.post<ReservacionDto>(`http://localhost:9700/reservacion`, reservacionRequestDto)
  }

  listReservacionPagination(pageRequestDto: PaginationRequestDto): Observable<PaginationDto> {
    return this.httpClient.post<PaginationDto>(`http://localhost:9700/reservacion`, pageRequestDto)
  }

  generateReport(username: string):Observable<Blob> {
    return this.httpClient.get(`http://localhost:9700/report/r1`, {params: {username}, responseType: 'blob'})
  }


}
