import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  @Input() users: any;
  @Output() cancelRegister = new EventEmitter();

  private readonly accountService = inject(AccountService);
  private readonly toastrService = inject(ToastrService);

  model: any = {};

  register() {
    this.accountService.register(this.model)
      .subscribe(response => {
        console.log(response);
        this.cancel();
      }, err => this.toastrService.error(err.error));
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
