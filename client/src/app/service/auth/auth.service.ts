import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {catchError, map} from "rxjs/operators";
import {User} from "../../interface/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private loginBtnClickedSubject: BehaviorSubject<any> = new BehaviorSubject<any>(false);

  constructor(private http: HttpClient) {
    if (this.isLoggedIn()) {
      const loginUser = JSON.parse(localStorage.getItem('loginUser'));
      this.currentUserSubject.next(loginUser);
      /* this.getUser().subscribe(user => {

      }, (error) => {
          this.logout();
      }); */
    }
  }

  login(userData) {
     return this.http.post<any>(`${environment.authUrl}/auth/login`, { ...userData })
       .pipe(map((response) => {
         const user = { ...response, token: response.accessToken };
         localStorage.setItem('loginUser', JSON.stringify(user));
         this.currentUserSubject.next(user);
         return user;
       }));
  }

  register(user) {
    return this.http.post<User>(environment.apiUrl + '/auth/register', {...user})
      .pipe(map((data) =>{
        console.log(data);
        return data;
      }, catchError(this.handleError)));
  }

  loginBtnClicked(value) {
    this.loginBtnClickedSubject.next(value);
  }

  loginBtnClickedObservable(): Observable<boolean> {
    return this.loginBtnClickedSubject.asObservable();
  }

  logout() {
    localStorage.removeItem('loginUser');
    this.currentUserSubject.next(null);
  }

  public isLoggedIn(): boolean {
    return !!localStorage.getItem('loginUser');
  }

  public getCurrentUserObservable() {
    return this.currentUserSubject.asObservable();
  }

  public getCurrentUser() {
    return this.currentUserSubject.getValue();
  }

  public isAdmin() {
    return this.getCurrentUser() && this.getCurrentUser().isAdmin;
  }

  public getLoggedUserName(): string {
    const user = this.currentUserSubject.getValue();
    return user && user.username;
  }

  public getLoggedUserId(): string {
    const user = this.currentUserSubject.getValue();
    return user && user.id;
  }

  // Error handling
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

}
