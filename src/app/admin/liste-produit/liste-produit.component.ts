import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { ServiceBackService } from 'src/app/service-back.service';

@Component({
  selector: 'app-liste-produit',
  templateUrl: './liste-produit.component.html',
  styleUrls: ['./liste-produit.component.css']
})
export class ListeProduitComponent {
  title = 'Ecomm';
  isModalOpen = false;
  isModalOpenModif = false;
  isModalConfirm = false;
  isModalPanier = false;
  isModalAjoutPanier = false;
  ajoutProduitForm!: FormGroup;
  modifierProduitForm!: FormGroup;
  confirmForm!: FormGroup;
  panierForm!: FormGroup;
  ajoutPanierForm!: FormGroup;
  imageUrl!: string;
  utilisateur: any[] = [];
  produit!: any[];
  panier!: any[];
  searchInput!: any;
  file: File | undefined;

  //CONSTRUCTEUR
  constructor(private router: Router, private service: ServiceBackService, private toastr: ToastrService, private formBuilder: FormBuilder, private http: HttpClient, private route: ActivatedRoute) {
    this.ajoutProduitForm = this.formBuilder.group({
      idProd: ['', Validators.required],
      nomProd: ['', Validators.required],
      descProd: ['', Validators.required],
      categorieProd: ['', Validators.required],
      imageProd: ['', Validators.required],
      prixProd: ['', Validators.required],
      stockProd: ['', Validators.required]
    });
    this.modifierProduitForm = this.formBuilder.group({
      idProdModif: ['', Validators.required],
      nomProdModif: ['', Validators.required],
      descProdModif: ['', Validators.required],
      categorieProdModif: ['', Validators.required],
      imageProdModif: ['', Validators.required],
      prixProdModif: ['', Validators.required],
      stockProdModif: ['', Validators.required]
    });

    this.ajoutPanierForm = this.formBuilder.group({
      nomProdPan: ['', Validators.required],
      nomUtilisateurPan: ['', Validators.required],
      idProdPan: ['', Validators.required],
      idUtilPan: ['', Validators.required],
      qttProdPan: ['', Validators.required]
    });

    this.panierForm = this.formBuilder.group({
      nomUtilPan: ['', Validators.required],
      motPassePan: ['', Validators.required]
    });

  }

  // FONCTION POUR AFFECTER LA VALEUR DE LA CARD AU FORMULAIRE DE MODIFICATION
  affecterValeur(cardId: number) {
    const idProd = document.getElementById('idProd' + cardId);
    const nomProd = document.getElementById("nomProd" + cardId);
    const descProd = document.getElementById("descProd" + cardId);
    const categorieProd = document.getElementById("categorieProd" + cardId);
    const prixProd = document.getElementById("prixProd" + cardId);
    const stockProd = document.getElementById('stockProd' + cardId);
    const imageProd = document.getElementById('imageProd' + cardId);
    if (idProd !== null && imageProd !== null && nomProd !== null && descProd !== null && categorieProd !== null && prixProd !== null && stockProd !== null) {
      this.modifierProduitForm.controls['idProdModif'].setValue(idProd.innerText);
      this.modifierProduitForm.controls['nomProdModif'].setValue(nomProd.innerText);
      this.modifierProduitForm.controls['descProdModif'].setValue(descProd.innerText);
      this.modifierProduitForm.controls['categorieProdModif'].setValue(categorieProd.innerText);
      this.modifierProduitForm.controls['prixProdModif'].setValue(prixProd.innerText.split(" ")[0]);
      this.modifierProduitForm.controls['stockProdModif'].setValue(stockProd.innerText);
      this.modifierProduitForm.controls['imageProdModif'].setValue(imageProd.innerText);
    }
  }

  affecterValeurProdPan(card: number) {
    const idProdPan = document.getElementById('idProd' + card);
    const nomProdPan = document.getElementById('nomProd' + card);

    if (idProdPan != null && nomProdPan != null) {
      this.ajoutPanierForm.controls['idProdPan'].setValue(idProdPan.innerText);
      this.ajoutPanierForm.controls['nomProdPan'].setValue(nomProdPan.innerText);
    }
  }

  affectValeurUtilPan() {
    const idUtilPan = this.panierForm.value.nomUtilPan
    if (idUtilPan != null) {
      this.ajoutPanierForm.controls['idUtilPan'].setValue(idUtilPan);
    }
  }


  // FONCTION POUR OUVRIR/FERMER LE MODAL DE MODIFICATION DU PRODUIT
  openModalModif() { this.isModalOpenModif = true; }
  closeModalModif() { this.isModalOpenModif = false; }

  // FONCTION POUR OUVRIR/FERMER LE MODAL DE CONFIRMATION AVANT LA SUPPRESSION
  openModalConfirm() {
    this.isModalOpenModif = false;
    this.isModalConfirm = true;
  }
  closeModalConfirm() { this.isModalConfirm = false; }

  // FONCTION POUR OUVRIR/FERMER LE MODAL D'AUTHENTIFICATION
  openModalPanier() { this.isModalPanier = true; }
  closeModalPanier() { this.isModalPanier = false; }

  // FONCTION POUR OUVRIR/FERMER LE MODAL D'AJOUT PANIER

  openModalAjoutPanier() {
    this.affectValeurUtilPan();
    this.isModalAjoutPanier = true;
  }
  closeModalAjoutPanier() { this.isModalAjoutPanier = false; }

  // AFFICHAGE DE PRODUIT
  fetchProduit() {
    this.service.listeProduit().subscribe(data => {
      this.produit = data;
      if (this.produit) {
        this.produit.forEach(prod => {
          this.getImageProd(prod.idProd);
        });
      } else {
        console.log("erreur");

      }
    })
  }

  searchProducts() {
    if (!this.searchInput) {
      return this.fetchProduit();
    }

    this.produit = this.produit.filter(prod =>
      prod.nomProd.toLowerCase().includes(this.searchInput.toLowerCase()) ||
      prod.descProd.toLowerCase().includes(this.searchInput.toLowerCase()) ||
      prod.categorieProd.toLowerCase().includes(this.searchInput.toLowerCase())
    );
  }

  ngOnInit(): void {

    this.fetchProduit();
    this.service.productAdded.subscribe(() => {
      this.fetchProduit();
    });
  }

  // AFFICHAGE PRODUIT
  images: { [key: number]: string } = {};
  getImageProd(idProd: number) {
    this.service.getImage(idProd).subscribe(data => {
      let reader = new FileReader();
      reader.addEventListener("load", () => {
        this.images[idProd] = reader.result as string;
      }, false);

      if (data) {
        reader.readAsDataURL(data);
      }
    });
  }

  // MODIFIER PRODUIT
  modifierProduit(event: Event) {
      const produitModif = this.modifierProduitForm.value;
        const produit = {
          categorieProd: produitModif.categorieProdModif,
          descProd: produitModif.descProdModif,
          imageProd: produitModif.imageProdModif,
          nomProd: produitModif.nomProdModif,
          stockProd: produitModif.stockProdModif,
          prixProd: produitModif.prixProdModif
        }
        const idProdModif: number = this.modifierProduitForm.controls['idProdModif'].value;
        this.service.modifierProduit(idProdModif, produit).subscribe(() => {
          this.fetchProduit();
          this.closeModalModif();
          this.toastr.success("Modification réussi", "Notification", { progressBar: true, progressAnimation: "increasing", positionClass: "toast-top-right", timeOut: 3000 });
        });
    event.preventDefault();
  }

  // SUPPRIMER PRODUIT
  deleteProduit() {
    const idProdModif: number = this.modifierProduitForm.controls['idProdModif'].value;

    this.service.supprimerProduit(idProdModif).subscribe(() => {
      this.fetchProduit();
      this.toastr.success("Suppression réussi", "Notification", { progressBar: true, progressAnimation: "increasing", positionClass: "toast-top-right", timeOut: 3000 });
      this.closeModalConfirm();
    });
  }
  // AFFICHAGE D'IMAGE AVANT D'AJOUTER
  onFileChange(event: any) {
    const file = event.target.files[0];
    this.modifierProduitForm.controls["imageProdModif"].setValue(file.name);
  }
}
