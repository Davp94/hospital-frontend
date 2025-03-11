import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../service/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  if(authService.getToken()){
    const authRequest = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authService.getToken()}`)
    });
    return next(authRequest);
  }
  return next(req);
};
