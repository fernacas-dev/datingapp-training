import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  @Input() users: any;
  @Output() cancelRegister = new EventEmitter();

  private readonly accountService = inject(AccountService);

  model: any = {};

  register() {
    this.accountService.register(this.model)
      .subscribe(response => {
        console.log(response);
        this.cancel();
      }, err => console.log(err));
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
