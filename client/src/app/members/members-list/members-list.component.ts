import { Component, OnInit, inject } from '@angular/core';
import { MembersService } from '../../_services/members.service';
import { Pagination } from '../../_models/pagination';
import { ReplaySubject, Subject, combineLatest, merge, switchMap, tap } from 'rxjs';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrl: './members-list.component.scss'
})
export class MembersListComponent implements OnInit {
  private readonly memberServices = inject(MembersService);
  pagination!: Pagination;
  pageNumber = 1;
  pageSize = 5;

  membersSubject$ = new ReplaySubject<void>(1);

  members$ = this.membersSubject$.pipe(
    switchMap(() => this.memberServices.getMembers(this.pageNumber, this.pageSize)),
    tap((result) => {
      this.pagination = result.pagination!
    })
  )

  pageChanged(event: any) {
    this.pageNumber = event.page
    this.membersSubject$.next();
  }

  ngOnInit(): void {
    this.membersSubject$.next();
  }
}
