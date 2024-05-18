import { CanDeactivateFn } from '@angular/router';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';
import { ConfirmService } from '../_services/confirm.service';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

export const preventUnsavedChangesGuard: CanDeactivateFn<unknown> = (component, currentRoute, currentState, nextState): Observable<boolean> | boolean => {

  const confirmService = inject(ConfirmService);

  if (component instanceof MemberEditComponent) {
    if (component.editForm?.dirty) {
      return confirmService.confirm();
    }
  }

  return true;
};
