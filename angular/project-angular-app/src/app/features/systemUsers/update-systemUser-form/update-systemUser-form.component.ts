import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig  } from '@angular/material/snack-bar';
import { SystemUserService } from '../../../../../../SEM5_PI_23-24/angular/project-angular-app/src/app/Services/systemUser.service';
import { catchError, tap } from 'rxjs/operators';
import {SystemUser} from 'src/systemUserService/systemUser';
import { AuthService } from 'src/authService/auth.service';

@Component({
    selector: 'app-update-systemUser-form',
    templateUrl: './update-systemUser-form.component.html',
    styleUrls: ['./update-systemUser-form.component.css']
})

export class UpdateSystemUserFormComponent {

    email: string = " ";
    password: string = "";
    role: string = " ";
    phoneNumber: string = '';
    contribuinte: string = '';
    roles: any;

  selectedSystemUser: any;
  selectedSystemUser1: SystemUser | undefined;

    constructor(private systemUserService: SystemUserService, private authService: AuthService,private snackBar: MatSnackBar) { }

    ngOnInit() {
      this.authService.auth().subscribe((systemUser) => {
        this.selectedSystemUser = systemUser;
        console.log(this.selectedSystemUser1);
    })
    }

    closeForm() {
        this.systemUserService.closeForm();
    }

  onSubmit() {
    const systemUserData = {
      id: this.selectedSystemUser1?.id,
      email: this.email, // ou this.selectedSystemUser.email, dependendo do que você quer fazer
      password: this.password, // ou this.selectedSystemUser.password
      roleId: this.role, // ou this.selectedSystemUser.roleId
      phoneNumber: this.phoneNumber, // ou this.selectedSystemUser.phoneNumber
      contribuinte: this.contribuinte, // ou this.selectedSystemUser.contribuinte
    } as SystemUser;

    this.systemUserService.updateSystemUser(systemUserData)
      .pipe(
        tap((response) => {
          console.log('SystemUser updated successfully', response);
          const message = `SystemUser updated successfully! | Email: ${response.email} | RoleId: ${response.roleId} | PhoneNumber: ${response.phoneNumber} | Contribuinte: ${response.contribuinte}`;
          this.snackBar.open(message, 'Close', {
            duration: 5000, // 5 seconds
          });
        }),
        catchError((error) => {
          console.error('Error occurred while updating the systemUser, returned code:' + error.status);
          this.snackBar.open('Failed to update systemUser, returned code:' + error.status, 'Close', {
            duration: 5000, // 5 seconds
          });
          throw error;
        })
      )
      .subscribe();
  }
}
