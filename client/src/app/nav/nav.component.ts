import { Component, inject } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Observable, tap } from 'rxjs';
import { User } from '../_models/user';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  private readonly accountService = inject(AccountService);

  model: any = {};
  loggedIn: boolean = false;
  currentUser$: Observable<User | null> = this.accountService.currentUser$;

  login() {
    this.accountService.login(this.model).subscribe();
  }

  logout() {
    this.accountService.logout();
  }
}
