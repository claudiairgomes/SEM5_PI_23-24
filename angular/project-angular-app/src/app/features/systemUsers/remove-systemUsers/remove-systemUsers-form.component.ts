import { Component } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig  } from '@angular/material/snack-bar';
import { catchError, tap } from 'rxjs/operators';
import {SystemUsersService} from "src/app/Services/systemUsers.service";
import {SystemUser} from "src/app/Interfaces/systemUser";
import { AuthService } from 'src/app/Services/auth.service';

@Component({
    selector: 'app-remove-systemUser-form',
    templateUrl: './remove-systemUsers-form.component.html',
    styleUrls: ['./remove-systemUsers-form.component.css']
})

export class RemoveSystemUsersFormComponent {

    email: string = " ";

    selectedSystemUser: any;

    constructor(private systemUserService: SystemUsersService, private authService: AuthService, private snackBar: MatSnackBar) { }

    ngOnInit() {
        this.authService.auth().subscribe((systemUser) => {
            this.selectedSystemUser = systemUser;
            console.log(this.selectedSystemUser);
        })
    }

    onSubmit() {
        const systemUserData = ({
            email: this.selectedSystemUser.email,
            password: this.selectedSystemUser.password,
            roleId: this.selectedSystemUser.roleId,
            phoneNumber: this.selectedSystemUser.phoneNumber,
            contribuinte: this.selectedSystemUser.contribuinte
        }) as SystemUser;

        this.systemUserService.removeSystemUser(systemUserData)
            .pipe(
                tap((response) => {
                    console.log('SystemUser removed successfully', response);
                    const message = `SystemUser removed successfully! | Email: ${response.email}`
                    this.snackBar.open(message, 'Close', {
                        duration: 5000, //5 seconds
                    });
                }),
                catchError((error) => {
                    console.error('Error occurred while removing the systemUser, returned code:' + error.status);
                    this.snackBar.open('Failed to update systemUser, returned code:' + error.status, 'Close', {
                        duration: 5000, //5 seconds
                    });
                    throw error;
                })
            )
            .subscribe();
    }

}
