import { Component, OnInit, inject } from '@angular/core';
import { User } from '../../_models/user';
import { AdminService } from '../../_services/admin.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { RolesModalComponent } from '../../modals/roles-modal/roles-modal.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss'
})
export class UserManagementComponent implements OnInit {
  users?: Partial<User[]> = [];
  bsModalRef?: BsModalRef;

  private readonly adminService = inject(AdminService);
  private readonly modalService = inject(BsModalService);

  getUsersWithRoles() {
    this.adminService.getUsersWithRoles().subscribe(user => {
      this.users = user;
    });
  }

  openRolesModal(user: User) {
    const config = {
      class: 'modal-dialog-centered',
      initialState: {
        user,
        roles: this.getRolesArray(user),

      }
    };

    this.bsModalRef = this.modalService.show(RolesModalComponent, config);
    this.bsModalRef.content.updateSelectedRoles.subscribe((values: any[]) => {
      const rolesToUpdate = {
        roles: [...values.filter((el: { checked: boolean; }) => el.checked === true).map((el: { name: any; }) => el.name)]
      };

      if (rolesToUpdate) {
        this.adminService.updateUserRoles(user.username, rolesToUpdate.roles).subscribe(() => {
          user.roles = [...rolesToUpdate.roles]
        });
      }
    });
  }

  ngOnInit(): void {
    this.getUsersWithRoles();
  }

  private getRolesArray(user: User): any[] {
    const roles: any[] = [];
    const userRoles = user.roles;
    const availableRoles: any[] = [
      { name: 'Admin', value: 'Admin' },
      { name: 'Moderator', value: 'Moderator' },
      { name: 'Member', value: 'Member' },
    ];

    availableRoles.forEach(role => {
      let isMatch = false;
      for (const userRole of userRoles) {
        if (role.name === userRole) {
          isMatch = true;
          role.checked = true;
          roles.push(role);
          break;
        }
      }
      if (!isMatch) {
        role.checked = false;
        roles.push(role);
      }
    });
    return roles;
  }
}
