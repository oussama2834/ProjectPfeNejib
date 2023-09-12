import { NgIf, NgFor, NgTemplateOutlet, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule, MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { DemandeAchat } from '../demandeAchatComponent/demande-achat';
import { InventoryService } from '../ecommerce/inventory/inventory.service';
import { DemandeAchatService } from '../demandeAchatComponent/demande-achat.service';
import { Article } from 'app/modules/Models/Article';

@Component({
  selector: 'app-add-demande-achat',
  templateUrl: './add-demande-achat.component.html',
    styleUrls: ['./add-demande-achat.component.scss'],
    standalone : true,
  imports : [NgIf,MatCardModule, MatProgressBarModule,MatDialogModule,MatRadioModule, MatFormFieldModule, MatIconModule, MatInputModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatSortModule, NgFor, NgTemplateOutlet, MatPaginatorModule, NgClass, MatSlideToggleModule, MatSelectModule, MatOptionModule, MatCheckboxModule, MatRippleModule]
})
export class AddDemandeAchatComponent {
    AddForm: UntypedFormGroup;
    demandes: DemandeAchat[] = [];
    articles: Article[] = [];
    articlescontrols = new FormControl('');
    constructor(
        private _formBuilder: UntypedFormBuilder,
        private inventoryservice: InventoryService,
        private demandeAchatService : DemandeAchatService

    ) { }
    getAllArticles() {
        this.inventoryservice.ListOfArticles().subscribe((res) => {
            this.articles = res
            console.log('articles', this.articles)

        }, (error) => {
       console.log(error)
    })
    }
    ngOnInit() {
        this.getAllArticles();
        this.getAllDemands();
        this.AddForm = this._formBuilder.group({
            dateDemande             : ['', Validators.required],
            dateApprobation      : ['',Validators.required],
            qteDemandee            : ['',Validators.required],
            qteApprouvee            : ['',Validators.required],
            description           : ['',Validators.required],
            delais            : ['',Validators.required],
            etat         : ['',Validators.required],
            motifRejet             : ['',Validators.required],
            articles           : [[],Validators.required],

        });
    }
    getAllDemands() {
        this.demandeAchatService.listDemandeAchat().subscribe((res) => {
            this.demandes = res
            console.log('demandes', this.demandes)

        }, (error) => {
       console.log(error)
    })
    }
    onFormSubmit() {
        console.log(this.AddForm.value)
        this.demandeAchatService.ajouterDemandeAchat(this.AddForm.value).subscribe((res) => {
            console.log(res)
            this.getAllDemands();
            window.location.reload();
     },(error)=> {
        console.log(error)
     } )
    }
}
