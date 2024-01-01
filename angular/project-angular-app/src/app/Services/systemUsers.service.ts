import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Floors } from "../Interfaces/floors";
import { Observable } from "rxjs";
import {SystemUser} from "../Interfaces/systemUser";
import {Role} from "../../../../../src/domain/role";

@Injectable({
    providedIn: "root"
})
export class SystemUsersService {
  constructor(private http: HttpClient) {
  }

  createSystemUser(systemUser: SystemUser): Observable<SystemUser> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.post<SystemUser>('http://localhost:4000/api/user', systemUser, httpOptions);
  }

  removeSystemUser(systemUser: SystemUser): Observable<SystemUser> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.post<SystemUser>('http://localhost:4000/api/user/remove', systemUser, httpOptions);
  }

  getAllRoles(): Observable<Role[]> {
    console.log("Service");
    return this.http.get<Role[]>('http://localhost:4000/api/role/findAll')
  }

  getRoleById(): Observable<string> {
    console.log("Service");
    return this.http.get<string>('http://localhost:4000/api/user/')
  }

  getUserByEmail(systemUserEmail: string): Observable<SystemUser[]> {
    console.log("Service");
    return this.http.get<SystemUser[]>('http://localhost:4000/api/user/findByEmail' + systemUserEmail);
  }
}
