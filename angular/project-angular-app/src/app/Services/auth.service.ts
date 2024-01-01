import {Component, Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject  } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {SystemUser} from 'src/app/Interfaces/systemUser';
import AuthSystemUser from 'src/app/Interfaces/authSystemUser';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private http: HttpClient) {
  }

  login(user: AuthSystemUser): Observable<SystemUser> {
    const httpOptions = { withCredentials: true };

    return this.http.post<SystemUser>('http://localhost:5095/api/Auth/login/', user, httpOptions)
      .pipe(
    );
  }

  auth(): Observable<AuthSystemUser> {
    const httpOptions = { withCredentials: true };

    return this.http.get<AuthSystemUser>('http://localhost:5095/api/Auth/session/', httpOptions)
      .pipe(
        //catchError(this.handleError('addBuilding', building))
    );
  }


}
