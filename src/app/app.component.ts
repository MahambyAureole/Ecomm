import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ServiceBackService } from './service-back.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Ecomm';
  isModalOpen = false;
  ajoutProduitForm!: FormGroup;
  modifierProduitForm!: FormGroup;
  imageUrl!: string;
  ouvrirListeProduit = false;
  file: File | undefined;

  //CONSTRUCTEUR
  constructor(private router: Router ,private service: ServiceBackService, private toastr: ToastrService,private formBuilder: FormBuilder,private http: HttpClient, private route: ActivatedRoute) {
    this.ajoutProduitForm = this.formBuilder.group({
      idProd: ['', Validators.required],
      nomProd: ['', Validators.required],
      descProd: ['', Validators.required],
      categorieProd: ['', Validators.required],
      imageProd: ['', Validators.required],
      prixProd: ['', Validators.required],
      stockProd: ['', Validators.required]
    });
  }
  
  listeProduit(){
    this.ouvrirListeProduit = true;
  }

  // FONCTION POUR OUVRIR/FERMER LE MODALE D'AJOUT DU PRODUIT
  openModal() {
    this.isModalOpen = true;
  }
  closeModal() {
    this.isModalOpen = false;
    this.imagePreviewUrl = null;
    this.fileInput.nativeElement.value = '';
  }
  produit!: any[];


  // AFFICHAGE DE PRODUIT
fetchProduit() {
    this.service.listeProduit().subscribe(data => {
      this.produit = data;
      
    })
  }
  getNomImage(event: any): void {
    if (this.file) {
      const fileName = this.file.name;
      console.log('Nom du fichier sélectionné :', fileName);
    } else {
        console.log("Aucun fichier sélectionné");
    }
  }

  ngOnInit(): void {
    this.fetchProduit();
  }

  // AJOUT PRODUIT
  ajoutProduit(event: Event) {
    const produit = this.ajoutProduitForm.value;
    const imageProd = produit.imageProd;
    console.log(imageProd);
    
    // console.log(produit);
    this.service.ajoutProduit(produit).subscribe(() => {
      this.fetchProduit();
      this.ajoutProduitForm.reset();
      this.imagePreviewUrl = null;
      this.fileInput.nativeElement.value = '';
      this.toastr.success("Produit ajouté avec succès","Notification",{positionClass:"toast-top-right",timeOut:1000});
    });
    event.preventDefault();
  }
  
  // AFFICHAGE D'IMAGE AVANT D'AJOUTER
  @ViewChild('fileInput') fileInput!: ElementRef;
  imagePreviewUrl!: string | ArrayBuffer | null;
  onFileSelected(event: any) {
    this.file  = event.target.files?.[0];

    if (this.file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.imagePreviewUrl = e.target.result;
      }

      reader.readAsDataURL(this.file);
      const formData = new FormData();
      formData.append('file',this.file);
    }
    
  }
  
  //controle champ de texte, ne peut pas ecrire des chiffres
  controlechampText(event: any) {
    const inputValeur = event.target.value;
    if (/[^A-Z-a-z]/.test(inputValeur)) {
      const index = inputValeur.search(/A-Z-a-z/)
      const dernierMot = inputValeur.slice(0, index);
      event.target.value = dernierMot;
    }
  }

  // controle champ de texte, ne peut pas ecrire des lettres
  controleChampChiffre(event: any) {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;
  if(/[^0-9]/.test(inputValue)){
    const index = inputValue.search(/[^0-9]/);
    const dernierChiffre = inputValue.slice(0, index)
    inputElement.value = dernierChiffre;
  }
  }

}
