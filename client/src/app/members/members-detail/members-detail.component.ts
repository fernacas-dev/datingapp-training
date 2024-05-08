import { Component, inject } from '@angular/core';
import { MembersService } from '../../_services/members.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-members-detail',
  templateUrl: './members-detail.component.html',
  styleUrl: './members-detail.component.scss'
})
export class MembersDetailComponent {

  private readonly membersService = inject(MembersService);
  private readonly route = inject(ActivatedRoute);

  member$ = this.membersService.getMember(this.route.snapshot.paramMap.get('username')!)

}
