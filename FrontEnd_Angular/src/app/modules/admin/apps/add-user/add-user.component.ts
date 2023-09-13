import { NgIf, NgFor, NgTemplateOutlet, NgClass, AsyncPipe, CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule, MatRippleModule } from '@angular/material/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { fuseAnimations } from '@fuse/animations';
import { UserService } from 'app/core/user/user.service';
import { Role } from 'app/core/user/user.types';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.scss'],
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations     : fuseAnimations,
    standalone     : true,
    imports        : [NgIf,TableModule,MatCardModule,MatTableModule, MatProgressBarModule,MatDialogModule,MatRadioModule, MatFormFieldModule, MatIconModule, MatInputModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatSortModule, NgFor, NgTemplateOutlet, MatPaginatorModule, NgClass, MatSlideToggleModule, MatSelectModule, MatOptionModule, MatCheckboxModule, MatRippleModule, AsyncPipe, CurrencyPipe],

})
export class AddUserComponent {
    UserForm: UntypedFormGroup;
    roles: Role[] = [];
    constructor(private userService : UserService,private _dialog: MatDialog,
        private cdRef: ChangeDetectorRef,private _formBuilder: UntypedFormBuilder,
        ) {
            this.UserForm = this._formBuilder.group({
                name: ['', Validators.required],
                email: ['', [Validators.required, Validators.email]],
                password: ['', Validators.required],
                tele: ['', Validators.required],
                address: ['', Validators.required],
                sexe: ['', Validators.required],
                roles: ['', Validators.required],
                position: ['', Validators.required],
                departement: ['', Validators.required],
                agreements: ['', Validators.requiredTrue],
            });
    }
    ngOnInit() {
        this.getRoles();
    }
    getRoles(){
        this.userService.GetRoles().subscribe(res => {
            this.roles = res
            console.log(this.roles)
            this.cdRef.detectChanges();
        }, error => {
            console.log(error)
   })
    }
    AddUser() {
        console.log(this.UserForm.value)
        this.userService.AddUser(this.UserForm.value).subscribe(res => {
            console.log(res)
            window.location.reload();
        }, error => {
         console.log(error)
        })
    }

}
