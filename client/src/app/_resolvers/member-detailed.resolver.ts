import { ResolveFn } from '@angular/router';
import { Member } from '../_models/member';
import { inject } from '@angular/core';
import { MembersService } from '../_services/members.service';
import { Observable } from 'rxjs';

export const memberDetailedResolver: ResolveFn<Observable<Member>> = (route, state) => {

  const membersService = inject(MembersService);

  return membersService.getMember(route.paramMap.get('username')!);
};
