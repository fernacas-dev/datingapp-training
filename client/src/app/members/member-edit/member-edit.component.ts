import { Component, HostListener, ViewChild, inject } from '@angular/core';
import { AccountService } from '../../_services/account.service';
import { MembersService } from '../../_services/members.service';
import { ReplaySubject, merge, switchMap, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Member } from '../../_models/member';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrl: './member-edit.component.scss'
})
export class MemberEditComponent {

  private readonly accountService = inject(AccountService);
  private readonly membersService = inject(MembersService);
  private readonly toastrService = inject(ToastrService);

  @ViewChild('editForm') editForm!: NgForm;
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  user$ = this.accountService.currentUser$;

  updateMemberSubject$ = new ReplaySubject<Member>();

  update$ = this.updateMemberSubject$.pipe(
    switchMap(member => this.membersService.updateMember(member)),
    tap((member) => this.editForm.reset(member)),
    tap(() => this.toastrService.success('Profile updated successfully')),
  );

  refresh$ = this.user$.pipe(
    switchMap((user) => this.membersService.getMember(user?.username!)),
  );

  member$ = merge(
    this.refresh$,
    this.update$,
  );

  updateMember(member: Member) {
    this.updateMemberSubject$.next(member);
  }
}
