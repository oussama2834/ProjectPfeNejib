import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule, MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { Article } from 'app/modules/Models/Article';
import { InventoryService } from 'app/modules/admin/apps/ecommerce/inventory/inventory.service';
import { InventoryBrand, InventoryCategory, InventoryPagination, InventoryProduct, InventoryTag, InventoryVendor } from 'app/modules/admin/apps/ecommerce/inventory/inventory.types';
import { debounceTime, map, merge, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';
import { NgIf, NgFor, NgTemplateOutlet, NgClass } from '@angular/common';
@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
    styleUrls: ['./add-article.component.scss'],
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations     : fuseAnimations,
    standalone     : true,
    imports        : [NgIf,MatCardModule, MatProgressBarModule,MatDialogModule,MatRadioModule, MatFormFieldModule, MatIconModule, MatInputModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatSortModule, NgFor, NgTemplateOutlet, MatPaginatorModule, NgClass, MatSlideToggleModule, MatSelectModule, MatOptionModule, MatCheckboxModule, MatRippleModule],
})
export class AddArticleComponent {
    AddForm: UntypedFormGroup;
    articles: Article[] = [];
    constructor(
        private _formBuilder: UntypedFormBuilder,
        private inventoryservice : InventoryService

    ) { }

    ngOnInit() {
        this.getAllArticles();
        this.AddForm = this._formBuilder.group({
            name             : ['', Validators.required],
            description      : ['',Validators.required],
            brand            : ['',Validators.required],
            quantity            : ['',Validators.required],
            vendor           : ['',Validators.required],
            stock            : ['',Validators.required],
            reserved         : ['',Validators.required],
            cost             : ['',Validators.required],
            dateAdded           : ['',Validators.required],
            taxPercent       : ['',Validators.required],
            price            : ['',Validators.required],
            active           : [false,Validators.required],
        });
    }
    getAllArticles() {
        this.inventoryservice.ListOfArticles().subscribe((res) => {
            this.articles = res
            console.log('articles', this.articles)

        }, (error) => {
       console.log(error)
    })
    }
    onFormSubmit() {
        this.inventoryservice.AddArticle(this.AddForm.value).subscribe((res) => {
            console.log(res)
            this.getAllArticles();
            window.location.reload();
     },(error)=> {
        console.log(error)
     } )
    }
}
