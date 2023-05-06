import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  json_url = 'https://jsonplaceholder.typicode.com/users';

  //base_url = "http://localhost:8080";

  headers: HttpHeaders;
  dataTosend = { id: 1, name: 'Sudha' };

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  user: User;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('user'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
    this.headers = new HttpHeaders().set('content-type', 'application/json');
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  getDataFromServer(): Observable<any[]> {
    return this.http.get<any[]>(this.json_url);
  }

  getDatafromServer1() {
    return this.http.get(this.json_url, { headers: this.headers });
  }

  postDataToServer(id: number, username: string) {
    return this.http.post(
      this.json_url,
      { id, username },
      { headers: this.headers }
    );
  }

  postDataToNodeServer(id: number, username: string): Observable<any> {
    return this.http.post<any>('api/data', { id, username });
  }

  getQuiz(): Observable<any[]> {
    return this.http.get<any[]>('api/quiz');
  }

  createNewUser(value: any): Observable<any> {
    return this.http.post('api/register-user', value);
  }

  checkLogin(user: any): Observable<boolean> {
    return this.http.post<boolean>('api/check-login', user).pipe(
      map((user: any) => {
        if (user) {
          sessionStorage.setItem('user', JSON.stringify(user.email));
          this.currentUserSubject.next(user);
          this.user = user;
        }

        return user;
      })
    );
  }

  addQuestion(quiz: any): Observable<any> {
    return this.http.post<any>('api/add-question', quiz);
  }
}
