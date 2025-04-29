import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReservacionRequestDto } from '../dto/reservacion-request.dto';
import { ReservacionDto } from '../dto/reservacion.dto';
import { Observable } from 'rxjs';
import { PaginationRequestDto } from '../dto/pagination-request.dto';
import { PaginationDto } from '../dto/pagination.dto';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservacionService {

  private apiUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }

  createReservacion(reservacionRequestDto: ReservacionRequestDto): Observable<ReservacionDto> {
    return this.httpClient.post<ReservacionDto>(`${this.apiUrl}/reservacion`, reservacionRequestDto)
  }

  listReservacionPagination(pageRequestDto: PaginationRequestDto): Observable<PaginationDto> {
    return this.httpClient.post<PaginationDto>(`${this.apiUrl}/reservacion/pagination`, pageRequestDto)
  }

  generateReport(username: string):Observable<Blob> {
    return this.httpClient.get(`${this.apiUrl}/report/r1`, {params: {username}, responseType: 'blob'})
  }


}
