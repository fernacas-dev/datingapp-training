import { Component, OnInit, inject } from '@angular/core';
import { MembersService } from '../../_services/members.service';
import { Pagination } from '../../_models/pagination';
import { ReplaySubject, switchMap, take, tap } from 'rxjs';
import { AccountService } from '../../_services/account.service';
import { User } from '../../_models/user';
import { UserParams } from '../../_models/userParams';

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrl: './members-list.component.scss'
})
export class MembersListComponent implements OnInit {
  private readonly memberServices = inject(MembersService);

  user!: User;
  userParams: UserParams = this.memberServices.getUserParams();

  pagination!: Pagination;
  genderList = [{ value: 'male', display: 'Males' }, { value: 'female', display: 'Females' }];

  membersSubject$ = new ReplaySubject<void>(1);

  members$ = this.membersSubject$.pipe(
    switchMap(() => this.memberServices.getMembers(this.userParams)),
    tap((result) => {
      this.pagination = result.pagination!
    })
  )

  pageChanged(event: any) {
    this.userParams.pageNumber = event.page
    this.membersSubject$.next();
  }

  ngOnInit(): void {
    this.membersSubject$.next();
  }

  resetFilters() {
    this.userParams = this.memberServices.resetUserParams();
    this.membersSubject$.next();
  }

  loadMembers() {
    this.memberServices.setUserParams(this.userParams);
    this.membersSubject$.next();
  }
}
