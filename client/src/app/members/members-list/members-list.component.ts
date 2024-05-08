import { Component, inject } from '@angular/core';
import { MembersService } from '../../_services/members.service';

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrl: './members-list.component.scss'
})
export class MembersListComponent {
  private readonly memberServices = inject(MembersService);

  members$ = this.memberServices.getMembers();
}
