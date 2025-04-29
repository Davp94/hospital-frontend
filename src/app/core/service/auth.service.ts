import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequestDto } from '../dto/login-request.dto';
import { Observable, tap } from 'rxjs';
import { LoginDto } from '../dto/login.dto';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: string | null = null;
  private apiUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient, private router: Router) { }

  login(loginRequestDto: LoginRequestDto): Observable<LoginDto> {
    console.log("🚀 ~ AuthService ~ login ~ loginRequestDto:", loginRequestDto)
    return this.httpClient.post<LoginDto>(`${this.apiUrl}/login`, loginRequestDto).pipe(
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
    this.router.navigateByUrl('/login');
  }
}
