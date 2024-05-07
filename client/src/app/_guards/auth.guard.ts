import { CanActivateFn } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { inject } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state): Observable<boolean> => {
  const accountService = inject(AccountService);
  const toastr = inject(ToastrService);

  return accountService.currentUser$.pipe(
    map(user => {
      console.log('You shall not pass!!')
      if (user) return true;
      toastr.error('You shall not pass!!');
      return false;
    })
  );
};
