import { Component, inject } from '@angular/core';
import { AccountService } from './_services/account.service';
import { User } from './_models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'The Dating App';

  private readonly accountService = inject(AccountService);

  setCurrentUser() {
    const user: User = JSON.parse(localStorage.getItem('user')!);
    this.accountService.setCurrentUser(user);
  }
}
