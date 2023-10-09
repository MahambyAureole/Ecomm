import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { ServiceBackService } from '../service-back.service';
import { Location } from '@angular/common';
import { UtilisateurService } from '../service/utilisateur.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  isModalOpen = false;
  ajoutProduitForm!: FormGroup;
  modifierProduitForm!: FormGroup;
  imageUrl!: string;
  ouvrirListeProduit = false;
  isDeconnexion= false;
  confirmForm!: FormGroup;
  file: File | undefined;
  nomAdmin$ = this.utilservice.getAdrMail();
  produit!: any[];
  currentDate = new Date();
  currentTime = new Date();
  futureDate = new Date(this.currentDate.getTime());


  constructor(private router: Router, private location: Location,private utilservice:UtilisateurService, private service: ServiceBackService, private toastr: ToastrService, private formBuilder: FormBuilder, private http: HttpClient, private route: ActivatedRoute) {
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

  listeProduit() {
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
  openModalConfirm() {
    this.isDeconnexion = true;
  }
  closeConfirm(){
    this.isDeconnexion = false;
  }

  // AFFICHAGE DE PRODUIT
  fetchProduit() {
    this.service.listeProduit().subscribe(data => {
      this.produit = data;

    })
  }

  deconnecter() {
    this.router.navigateByUrl("authentification");
    this.location.replaceState("authentification")
  }
  getNomImage(event: any): void {
    if (this.file) {
      const fileName = this.file.name;
      const formData = new FormData();
      formData.append('file', this.file);
      console.log('Nom du fichier sélectionné :', fileName);
    } else {
      console.log("Aucun fichier sélectionné");
    }
  }

  ngOnInit(): void {
    this.nomAdmin$.subscribe();
    this.fetchProduit();
    setInterval(() => {
      this.currentDate = new Date();
    }, 1000);
    setInterval(() => {
      this.currentTime = new Date();
    }, 1000);
  }

  // AJOUT PRODUIT
  ajoutProduit(event: Event) {
    if (this.file){
      const fileName = this.file.name;
      const produitA = this.ajoutProduitForm.value;
      const produit = {
        nomProd: produitA.nomProd,
        descProd:produitA.descProd,
        categorieProd:produitA.categorieProd,
        imageProd: fileName,
        prixProd:produitA.prixProd,
        stockProd:produitA.stockProd
      }
      this.service.ajoutProduit(produit).subscribe(() => {
        this.fetchProduit();
        this.getNomImage(event);
        this.ajoutProduitForm.reset();
        this.imagePreviewUrl = null;
        this.fileInput.nativeElement.value = '';
        this.toastr.success("Produit ajouté avec succès", "Notification", { progressBar: true, progressAnimation:"increasing", positionClass: "toast-top-right", timeOut: 3000 });
      });
    }

    // console.log(produit);
    event.preventDefault();
  }

  // AFFICHAGE D'IMAGE AVANT D'AJOUTER
  @ViewChild('fileInput') fileInput!: ElementRef;
  imagePreviewUrl!: string | ArrayBuffer | null;
  onFileSelected(event: any) {
    this.file = event.target.files?.[0];

    if (this.file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.imagePreviewUrl = e.target.result;
      }

      reader.readAsDataURL(this.file);
    }
  }

  //controle champ de texte, ne peut pas ecrire des chiffres
  controlechampText(event: any) {
    const inputValeur = event.target.value;
    if (/[^A-Za-z0-9 ]/.test(inputValeur)) {
      const index = inputValeur.search(/A-Za-z0-9 /)
      const dernierMot = inputValeur.slice(0, index);
      event.target.value = dernierMot;
    }
  }

  // controle champ de texte, ne peut pas ecrire des lettres
  controleChampChiffre(event: any) {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;
    if (/[^0-9]/.test(inputValue)) {
      const index = inputValue.search(/[^0-9]/);
      const dernierChiffre = inputValue.slice(0, index)
      inputElement.value = dernierChiffre;
    }
  }
}
