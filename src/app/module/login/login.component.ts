import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../core/service/auth.service';
import { Router } from '@angular/router';
import { LoginRequestDto } from '../../core/dto/login-request.dto';
import { PacienteService } from '../../core/service/paciente.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatCardModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username!: string;
  password!: string;
  constructor(private authService: AuthService, private router: Router){}

  authUser(){
    const authData: LoginRequestDto = {
      username: this.username,
      password: this.password
    }
    this.authService.login(authData).subscribe({
      next: (res:any) => {
        this.router.navigateByUrl('/')
      },
      error: err => alert('Error en authenticacion')
    })
  }

}
