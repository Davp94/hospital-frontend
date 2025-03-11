import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequestDto } from '../dto/login-request.dto';
import { Observable, tap } from 'rxjs';
import { LoginDto } from '../dto/login.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: string | null = null;
  constructor(private httpClient: HttpClient) { }

  login(loginRequestDto: LoginRequestDto): Observable<LoginDto> {
    return this.httpClient.post<LoginDto>('http://localhost:9700/login', loginRequestDto).pipe(
      tap((res: LoginDto) => {
        this.token = res.token;
        localStorage.setItem('token', this.token);
      }),
    )
  }

  getToken(): string | null {
    if(!this.token){
      this.token = localStorage.getItem('token');
    }
    return this.token;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('token');
  }
}
