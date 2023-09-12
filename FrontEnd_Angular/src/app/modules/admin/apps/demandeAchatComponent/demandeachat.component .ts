import { DecimalPipe, NgClass, NgFor ,NgIf} from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { NgForm, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { FuseAlertComponent, FuseAlertType } from '@fuse/components/alert';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DemandeAchatService } from './demande-achat.service';
import { InventoryBrand, InventoryCategory, InventoryPagination, InventoryProduct, InventoryTag, InventoryVendor } from '../ecommerce/inventory/inventory.types';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable, Subject, debounceTime, map, merge, switchMap, takeUntil } from 'rxjs';
import { DemandeAchat } from './demande-achat';
import { MatDialog } from '@angular/material/dialog';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { AddArticleComponent } from '../add-article/add-article.component';
import { InventoryService } from '../ecommerce/inventory/inventory.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AddDemandeAchatComponent } from '../add-demande-achat/add-demande-achat.component';
import { TableModule } from 'primeng/table';

@Component({
    selector: 'app-demandeachat',
    templateUrl: './demandeachat.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [RouterOutlet,
        RouterLink,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatButtonToggleModule,
        NgApexchartsModule,
        MatTooltipModule,
        NgFor,
        DecimalPipe,
        FuseAlertComponent,
        MatFormFieldModule,
        MatInputModule,
        NgIf,MatPaginatorModule,NgClass,TableModule
    ],
})
export class DemandeAchatComponent implements OnInit {

    @ViewChild(MatPaginator) private _paginator: MatPaginator;
    @ViewChild(MatSort) private _sort: MatSort;

    products$: Observable<InventoryProduct[]>;
    IsOpen = false;
    brands: InventoryBrand[];
    categories: InventoryCategory[];
    filteredTags: InventoryTag[];
    flashMessage: 'success' | 'error' | null = null;
    isLoading: boolean = false;
    pagination: InventoryPagination;
    searchInputControl: UntypedFormControl = new UntypedFormControl();
    selectedProduct: InventoryProduct | null = null;
    selectedDemande : DemandeAchat ;

    selectedProductForm: UntypedFormGroup;
    tags: InventoryTag[];
    tagsEditMode: boolean = false;
    vendors: InventoryVendor[];
    achats :DemandeAchat[] = [];
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseConfirmationService: FuseConfirmationService,
        private _formBuilder: UntypedFormBuilder,
        private _inventoryService: InventoryService,
        private _dialog: MatDialog,
        private demandeAchatService: DemandeAchatService,
        private cdRef: ChangeDetectorRef
    )
    {
        this.getAllAchats();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    getAllAchats() {
        this.demandeAchatService.listDemandeAchat().subscribe((res) => {
            this.achats = res
            console.log('achats', this.achats)
            this.cdRef.detectChanges();
        }, (error) => {
       console.log(error)
    })
    }
    ngOnInit(): void
    {
        this.getAllAchats();

        // Create the selected product form
        this.selectedProductForm = this._formBuilder.group({
            name             : ['', Validators.required],
            description      : ['',Validators.required],
            brand            : ['',Validators.required],
            quantity            : ['',Validators.required],
            vendor           : ['',Validators.required],
            stock            : ['',Validators.required],
            reserved         : ['',Validators.required],
            cost             : ['',Validators.required],
            dateAdded             : ['',Validators.required],
            taxPercent       : ['',Validators.required],
            price            : ['',Validators.required],
            active           : [false,Validators.required],
        });

        // Get the brands
        // this._inventoryService.brands$
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe((brands: InventoryBrand[]) =>
        //     {
        //         // Update the brands
        //         this.brands = brands;

        //         // Mark for check
        //         this._changeDetectorRef.markForCheck();
        //     });

        // Get the categories
        // this._inventoryService.categories$
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe((categories: InventoryCategory[]) =>
        //     {
        //         // Update the categories
        //         this.categories = categories;

        //         // Mark for check
        //         this._changeDetectorRef.markForCheck();
        //     });

        // Get the pagination
        // this._inventoryService.pagination$
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe((pagination: InventoryPagination) =>
        //     {
        //         // Update the pagination
        //         this.pagination = pagination;

        //         // Mark for check
        //         this._changeDetectorRef.markForCheck();
        //     });

        // Get the products
        // this.products$ = this._inventoryService.products$;

        // Get the tags
        // this._inventoryService.tags$
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe((tags: InventoryTag[]) =>
        //     {
        //         // Update the tags
        //         this.tags = tags;
        //         this.filteredTags = tags;

        //         // Mark for check
        //         this._changeDetectorRef.markForCheck();
        //     });

        // Get the vendors
        // this._inventoryService.vendors$
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe((vendors: InventoryVendor[]) =>
        //     {
        //         // Update the vendors
        //         this.vendors = vendors;

        //         // Mark for check
        //         this._changeDetectorRef.markForCheck();
        //     });

        // Subscribe to search input field value changes
        // this.searchInputControl.valueChanges
        //     .pipe(
        //         takeUntil(this._unsubscribeAll),
        //         debounceTime(300),
        //         switchMap((query) =>
        //         {

        //             this.isLoading = true;
        //             return this._inventoryService.getProducts(0, 10, 'name', 'asc', query);
        //         }),
        //         map(() =>
        //         {
        //             this.isLoading = false;
        //         }),
        //     )
        //     .subscribe();
    }

    /**
     * After view init
     */
    ngAfterViewInit(): void
    {
        // if ( this._sort && this._paginator )
        // {
        //     // Set the initial sort
        //     this._sort.sort({
        //         id          : 'name',
        //         start       : 'asc',
        //         disableClear: true,
        //     });

        //     // Mark for check
        //     this._changeDetectorRef.markForCheck();

        //     // If the user changes the sort order...
        //     this._sort.sortChange
        //         .pipe(takeUntil(this._unsubscribeAll))
        //         .subscribe(() =>
        //         {
        //             // Reset back to the first page
        //             this._paginator.pageIndex = 0;

        //             // Close the details
        //             // this.closeDetails();
        //         });

        //     // Get products if sort or page changes
        //     merge(this._sort.sortChange, this._paginator.page).pipe(
        //         switchMap(() =>
        //         {
        //             // this.closeDetails();
        //             this.isLoading = true;
        //             return this._inventoryService.getProducts(this._paginator.pageIndex, this._paginator.pageSize, this._sort.active, this._sort.direction);
        //         }),
        //         map(() =>
        //         {
        //             this.isLoading = false;
        //         }),
        //     ).subscribe();
        // }
    }

    /**
     * On destroy
     */
    // ngOnDestroy(): void
    // {
    //     // Unsubscribe from all subscriptions
    //     this._unsubscribeAll.next(null);
    //     this._unsubscribeAll.complete();
    // }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle product details
     *
     * @param productId
     */


        // Get the product by id



    /**
     * Close the details
     */


    /**
     * Cycle through images of selected product


    /**
     * Toggle the tags edit mode
     */


    /**
     * Filter tags
     *
     * @param event
     */


    /**
     * Filter tags input key down event
     *
     * @param event
     */



    /**
     * Add tag to the product
     *

    /**
     * Remove tag from the product
     *


    /**
     * Should the create tag button be visible
     *
     * @param inputValue
     */

    /**
     * Create product
     */
    //Added
   openformulaire() {
    const dialogRef = this._dialog.open(AddDemandeAchatComponent);
    dialogRef.afterClosed().subscribe({
        next: (val) => {
            if (val) {
                this.getAllAchats();
            }
        },
    });
}


    /**
     * Update the selected product using the form data


    /**
     * Delete the selected product using the form data
     */


    /**
     * Show flash message
     */

}
