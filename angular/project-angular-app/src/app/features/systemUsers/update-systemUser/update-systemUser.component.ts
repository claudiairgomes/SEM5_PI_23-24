import { Component } from "@angular/core";
import { SystemUserService } from "../../../../../../SEM5_PI_23-24/angular/project-angular-app/src/app/Services/systemUser.service";

@Component({
    selector: 'app-update-systemUser',
    templateUrl: './update-systemUser.component.html',
    styleUrls: ['./update-systemUser.component.css']
})

export class UpdateSystemUserComponent {

    isVisible: boolean = false;

    constructor(private systemUserService: SystemUserService) { }

    ngOnInit() {
        this.systemUserService.getFormVisibility().subscribe((isVisible) => {
            this.isVisible = this.isVisible;
        });

    }

}
