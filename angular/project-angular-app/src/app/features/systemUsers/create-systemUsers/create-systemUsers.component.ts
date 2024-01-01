import { Component } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig  } from '@angular/material/snack-bar';
import { catchError, tap } from 'rxjs/operators';
import {SystemUsersService} from "src/app/Services/systemUsers.service";
import {SystemUser} from "src/app/Interfaces/systemUser";


@Component({
  selector: 'app-create-systemUser-form',
  templateUrl: './create-systemUser-form.component.html',
  styleUrls: ['./create-systemUser-form.component.css']
})

export class CreateSystemUserFormComponent {

  email: string = " ";
  password: string = "";
  role: string = " ";
  phoneNumber: string = '';
  contribuinte: string = '';
  roles: any;

  constructor(private systemUserService: SystemUsersService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    // Ao inicializar o componente, buscar os roles
    this.systemUserService.getAllRoles()
      .pipe(
        tap((roles) => {
          this.roles = roles;
        }),
        catchError((error) => {
          console.error('Error occurred while fetching roles', error);
          // Handle error as needed
          return [];
        })
      )
      .subscribe();
  }

  onSubmit() {
    const systemUserData = ({
      email: this.email,
      password: this.password,
      roleId: this.role,
      phoneNumber: this.phoneNumber,
      contribuinte: this.contribuinte
    }) as SystemUser;

    this.systemUserService.createSystemUser(systemUserData)
      .pipe(
        tap((response) => {
          console.log('System User created successfully', response);
          const message = `System User created successfully! | Email: ${response.email} | Role: ${response.phoneNumber}`;
          this.snackBar.open(message, 'Close', {
            duration: 5000, // 5 seconds
          });
        }),
        catchError((error) => {
          console.error('Error occurred while creating the System User', error);
          this.snackBar.open('Failed to create System User, returned code:' + error.status, 'Close', {
            duration: 5000, // 5 seconds
          });
          throw error;
        })
      )
      .subscribe();
  }


}
