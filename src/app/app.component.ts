import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceBackService } from './service-back.service';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'Ecomm';
  isModalOpen = false;
  ajoutProduitForm!: FormGroup;

  openModal() {
    this.isModalOpen = true;
  }
  closeModal() {
    this.isModalOpen = false;
  }

  utilisateur: any[] = [];
  produit!: any[];

  constructor(private serviceUtil: ServiceBackService, private serviceProduit: ServiceBackService, private formBuilder: FormBuilder) { 
    this.ajoutProduitForm = this.formBuilder.group({
      nomProd: ['', Validators.required],
      descProd: ['', Validators.required],
      categorieProd: ['', Validators.required],
      imageProd: ['', Validators.required],
      prixProd: ['', Validators.required],
      stockProd: ['', Validators.required]
    });
  }

  fetchProduit(){
    this.serviceUtil.listeProduit().subscribe(data => {
      this.produit = data;
    })
  }

  ngOnInit(): void {
    this.serviceUtil.afficherUtilisateur().subscribe(data => {
      this.utilisateur = data;
    });

    this.fetchProduit();
  }

  ajoutProduit(event: Event) {
    if (this.ajoutProduitForm.valid) {
      const produit = this.ajoutProduitForm.value;
      this.serviceProduit.ajoutProduit(produit).subscribe(() => {
        this.fetchProduit();
        this.ajoutProduitForm.reset();
      });
    }
    
    event.preventDefault();
  }
}
