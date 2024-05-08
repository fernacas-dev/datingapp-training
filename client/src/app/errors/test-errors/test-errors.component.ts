import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-test-errors',
  templateUrl: './test-errors.component.html',
  styleUrl: './test-errors.component.scss'
})
export class TestErrorsComponent {
  baseUrl = 'http://localhost:5230/api/';
  validationErrors: string[] = [];

  private readonly http = inject(HttpClient);

  get404Error() {
    this.http.get(this.baseUrl + 'buggy/not-fount').subscribe(response => {
      console.log(response);
    }, error => console.log(error));
  }

  get400Error() {
    this.http.get(this.baseUrl + 'buggy/bad-request').subscribe(response => {
      console.log(response);
    }, error => console.log(error));
  }

  get500Error() {
    this.http.get(this.baseUrl + 'buggy/server-error').subscribe(response => {
      console.log(response);
    }, error => console.log(error));
  }

  get401Error() {
    this.http.get(this.baseUrl + 'buggy/auth').subscribe(response => {
      console.log(response);
    }, error => console.log(error));
  }

  get400ValidationError() {
    const data = {
      username: 'asd',
      password: 'dfd',
    }
    this.http.post(this.baseUrl + 'account/register', data).subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error)
      this.validationErrors = error;
    });
  }
}
