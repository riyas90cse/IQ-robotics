import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {environment} from "../../environments/environment";
import {User} from "../interface/user";
import {catchError, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAllUsers():Observable<any> {
    return this.http.get<User>(environment.apiUrl + '/user')
      .pipe(map((data) =>{
        console.log(data);
        return data;
      }, catchError(this.handleError)));
  }

  getUserById(id): Observable<User> {
    return this.http.get<User>(environment.apiUrl + '/user/' + id)
      .pipe(map((data) =>{
        console.log(data);
        return data;
      }, catchError(this.handleError)));
  }

  createUser(user): Observable<User> {
    console.log("User Data in Service", user);
    return this.http.post<User>(environment.apiUrl + '/user', {...user})
      .pipe(map((data) =>{
        console.log(data);
        return data;
      }, catchError(this.handleError)));
  }

  editUser(id, user): Observable<User> {
    return this.http.put<User>(environment.apiUrl + '/user/' + id , {...user})
      .pipe(map((data) =>{
        console.log(data);
        return data;
      }, catchError(this.handleError)));
  }


  deleteUser(id): Observable<any> {
    return this.http.delete<User>(environment.apiUrl + '/user/' + id)
      .pipe(map((data) =>{
        console.log(data);
        return data;
      }, catchError(this.handleError)));
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
