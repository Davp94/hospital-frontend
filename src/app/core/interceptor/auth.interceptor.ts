import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../service/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  if(token){
    const authRequest = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(authRequest);
  }
  return next(req);
};
