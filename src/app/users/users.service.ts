import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {User} from './user';
import {shareReplay, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  users: User[] = [];
  tempUsers: User[];
  observable$: Observable<any>;
  cachedUsers = new Map();

  constructor(private http: HttpClient) {
  }

  getUsers(page: number = 1): Observable<any> {
    const url = `https://reqres.in/api/users?page=${page}`;
    const cachedPage = this.cachedUsers.has(url) ? JSON.parse(this.cachedUsers.get(url)) : null;
    if (cachedPage) {
      return of(cachedPage);
    }
    this.observable$ = this.http.get(url, {
      observe: 'response'
    }).pipe(
      shareReplay(1),
      tap(res => {
        this.tempUsers = res.body.data;
        localStorage.setItem('response', JSON.stringify(res));
        const response = localStorage.getItem('response');
        this.cachedUsers.set(url, response);
      }));

    return this.observable$;
  }

  getUser(id: number): Observable<any> {
    const url = `https://reqres.in/api/users/${id}`;
    const cachedPage = this.cachedUsers.has(url) ? JSON.parse(this.cachedUsers.get(url)) : null;
    if (cachedPage) {
      return of(cachedPage);
    }
    this.observable$ = this.http.get(url).pipe(
      shareReplay(1),
      tap(res => {
        localStorage.setItem('response', JSON.stringify(res));
        const response = localStorage.getItem('response');
        this.cachedUsers.set(url, response);
      }));
    return this.observable$;
  }
}
