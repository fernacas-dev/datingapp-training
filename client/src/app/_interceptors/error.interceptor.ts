import { HttpErrorResponse, HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next): Observable<HttpEvent<unknown>> => {
  const router = inject(Router);
  const toastr = inject(ToastrService);

  return next(req).pipe(
    catchError((err: any) => {
      if (err instanceof HttpErrorResponse) {
        switch (err.status) {
          case 400:
            if (err.error.errors) {
              const modalStateErrors: any[] = [];

              Object.keys(err.error.errors)
                .forEach(key => {
                  modalStateErrors.push(err.error.errors[key]);
                });

              throw modalStateErrors;
            } else if (typeof (err.error) === 'object') {
              toastr.error(err.statusText, err.status.toString());
            } else {
              toastr.error(err.error, err.statusText);
            }
            break;
          case 401:
            toastr.error(err.statusText, err.status.toString());
            break;
          case 404:
            router.navigateByUrl('/not-found');
            break;
          case 500:
            const navigationExtras: NavigationExtras = { state: { error: err.error } };
            router.navigateByUrl('/server-error', navigationExtras);
            break;
          default:
            toastr.error('Something unexpected went wrong');
            console.log(err);
            break;
        }
      } else {
        // Handle non-HTTP errors
        console.error('An error occurred:', err);
      }

      // Re-throw the error to propagate it further
      return throwError(() => err);
    })
  );
};
