import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('auth_token');
  //console.log('INTERCEPTOR HIT');
  //console.log('URL:', req.url);
  //console.log('TOKEN:', token);

  if (token && !req.url.includes('login') && !req.url.includes('register')) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(cloned);
  }

  return next(req);
};
