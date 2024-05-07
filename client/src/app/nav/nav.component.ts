import { Component, inject } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Observable, tap } from 'rxjs';
import { User } from '../_models/user';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  private readonly accountService = inject(AccountService);
  private readonly router = inject(Router);
  private readonly toastr = inject(ToastrService)

  model: any = {};
  loggedIn: boolean = false;
  currentUser$: Observable<User | null> = this.accountService.currentUser$;

  login() {
    this.accountService.login(this.model).subscribe(response => {
      this.router.navigateByUrl('/members');
    }, error => this.toastr.error(error.error));
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
