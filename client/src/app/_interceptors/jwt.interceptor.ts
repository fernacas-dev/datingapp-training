import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null;

  req = req.clone({
    setHeaders: {
      Authorization: `Bearer ${user?.token}`,
    }
  });

  return next(req);
};
