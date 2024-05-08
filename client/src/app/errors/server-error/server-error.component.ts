import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrl: './server-error.component.scss'
})
export class ServerErrorComponent {
  router = inject(Router);
  navigation = this.router.getCurrentNavigation();
  error = this.navigation?.extras?.state ? this.navigation.extras.state['error'] : undefined;

}
