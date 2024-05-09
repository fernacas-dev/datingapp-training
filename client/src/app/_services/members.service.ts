import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Member } from '../_models/member';
import { Observable, map, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MembersService {

  baseUrl = environment.apiUrl;
  members: Member[] = [];

  http = inject(HttpClient);

  getMembers(): Observable<Member[]> {

    if (this.members.length > 0) return of(this.members);

    return this.http.get<Member[]>(this.baseUrl + "users")
      .pipe(
        map((members) => {
          this.members = this.members;
          return members;
        })
      );
  }

  getMember(username: string): Observable<Member> {
    const member = this.members.find(x => x.username === username);
    if (member !== undefined) return of(member);
    return this.http.get<Member>(this.baseUrl + `users/${username}`);
  }

  updateMember(member: Member) {
    return this.http.put<Member>(this.baseUrl + 'users', member)
      .pipe(
        map(() => {
          const index = this.members.indexOf(member);
          this.members[index] = member;
          return member;
        })
      );
  }
}
