import { Component } from '@angular/core';
import {catchError, tap} from "rxjs/operators";
import {MatSnackBar} from "@angular/material/snack-bar";
import {RegisterService} from "src/app/Services/register.service";
import Register from "src/app/Interfaces/register";

@Component({
  selector: 'app-register',
  templateUrl: './create-register.component.html',
  styleUrls: ['./create-register.component.css']
})

export class CreateRegisterComponent {

  email: string = "";
  password: string = "";
  status: string = "Pending";
  phoneNumber: string = '';
  contribuinte: string = '';
  acceptTerms: boolean = false;

  constructor( private snackBar: MatSnackBar, private registerService: RegisterService ) {}

  onAcceptTermsChange() {
    this.acceptTerms = true;
  }

  closeForm() {
    this.registerService.closeForm();
  }

  onSubmit() {
      const systemUserData = ({
        email: this.email,
        password: this.password,
        status: 'Pending',
        phoneNumber: this.phoneNumber,
        contribuinte: this.contribuinte
      }) as Register;

    this.registerService.addRegister(systemUserData)
      .pipe(
        tap((response) => {
          console.log(' Register created successfully', response);
          const message = `Register requested successfully! | Email: ${response.email} | Phone Number: ${response.phoneNumber}`;
          this.snackBar.open(message, 'Close', {
            duration: 5000, // 5 seconds
          });
        }),
        catchError((error) => {
          console.error('Error occurred while request to create the Register', error);
          this.snackBar.open('Failed to create Register, returned code:' + error.status, 'Close', {
            duration: 5000, // 5 seconds
          });
          throw error;
        })
      )
      .subscribe();
  }

  openTermsDocument() {
    const termsDocumentUrl = 'localhost:4200/RGPD';

    window.open(termsDocumentUrl, 'Terms and Conditions', 'width=1400,height=1400');  }
}
