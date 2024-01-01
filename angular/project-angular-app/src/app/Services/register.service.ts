import {Component, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import Register from "src/app/Interfaces/register";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private isVisible = new BehaviorSubject<boolean>(false);
  private user = new BehaviorSubject<Register>({} as Register);

  // @ts-ignore
  @Component({
    selector: 'app-create-systemUser-form',
    templateUrl: './create-register.component.html',
    styleUrls: ['./create-register.component.css']
  })

  constructor(private http: HttpClient) {
  }

  addRegister(user: Register): Observable<Register> {
    const httpOptions = { withCredentials: true };

    return this.http.post<Register>('http://localhost:5095/api/register', user, httpOptions)
      .pipe(
      );
  }

  openForm(user: Register) {
    this.user.next(user);
    this.isVisible.next(true);
  }

  closeForm() {
    this.isVisible.next(false);
  }

  getFormVisibility() {
    return this.isVisible.asObservable();
  }

}
