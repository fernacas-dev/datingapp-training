import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'The Dating App';

  private readonly http = inject(HttpClient);
  users$ = this.getUsers();

  getUsers(): Observable<any> {
    return this.http.get('http://localhost:5230/api/users');
  }
}
