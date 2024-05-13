import { Component, OnInit, inject } from '@angular/core';
import { Member } from '../_models/member';
import { MembersService } from '../_services/members.service';
import { PaginatedResult, Pagination } from '../_models/pagination';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrl: './lists.component.scss'
})
export class ListsComponent implements OnInit {

  members?: Partial<Member[]>;

  predicate = 'liked';
  pageNumber = 1;
  pageSize = 5;
  pagination?: Pagination;

  private readonly membersService = inject(MembersService);

  loadLikes() {
    this.membersService.getLikes(this.predicate, this.pageNumber, this.pageSize).subscribe(response => {
      this.members = response.result;
      this.pagination = response.pagination
    });
  }

  ngOnInit(): void {
    this.loadLikes();
  }

  pageChanged(event: any) {
    this.pageNumber = event.page;
    this.loadLikes();
  }
}
