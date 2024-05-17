import { Component, Input, inject } from '@angular/core';
import { Member } from '../../_models/member';
import { MembersService } from '../../_services/members.service';
import { ToastrService } from 'ngx-toastr';
import { PresenceService } from '../../_services/presence.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.scss'
})
export class MemberCardComponent {
  @Input() member!: Member;

  private readonly membersService = inject(MembersService);
  private readonly toastr = inject(ToastrService);
  public presence = inject(PresenceService);

  addLike(member: Member) {
    this.membersService.addLike(member.username).subscribe(() => {
      this.toastr.success('You have likes ' + member.knownAs);
    });
  }
}
