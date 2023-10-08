import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { ServiceBackService } from 'src/app/service-back.service';
import { UtilisateurService } from 'src/app/service/utilisateur.service';
import { PanierService } from 'src/app/service/panier.service';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent {
  title = 'Ecomm';
  isModalAjoutPanier = false;
  isModalComs = false;
  ajoutComs!: FormGroup;
  confirmForm!: FormGroup;
  ajoutPanierForm!: FormGroup;
  imageUrl!: string;
  searchTerm: string = '';
  utilisateur: any[] = [];
  produit!: any[];
  panier!: any[];
  searchInput!: any;
  commentaire!: any[];
  adrMail$ = this.utilservice.getAdrMail();
  idUtil$ = this.utilservice.getIdUtilisateur();


  //CONSTRUCTEUR
  constructor(private router: Router, private utilservice: UtilisateurService, private panService: PanierService, private service: ServiceBackService, private toastr: ToastrService, private formBuilder: FormBuilder, private http: HttpClient, private route: ActivatedRoute) {

    this.ajoutPanierForm = this.formBuilder.group({
      nomProdPan: ['', Validators.required],
      nomUtilisateurPan: ['', Validators.required],
      idProdPan: ['', Validators.required],
      idUtilPan: ['', Validators.required],
      qttProdPan: ['', Validators.required],
      stockProdPan: ['', Validators.required]
    });

    this.ajoutComs = this.formBuilder.group({
      idProdComs: ['', Validators.required],
      nomProdComs: ['', Validators.required],
      contenuComs: ['', Validators.required],
      nomUtilComs: ['', Validators.required],
      idUtilComs: ['', Validators.required]
    })

  }

  // FONCTION POUR AFFECTER LA VALEUR DE LA CARD AU FORMULAIRE DE MODIFICATION

  affecterValeurProdPan(card: number) {
    const idProdPan = document.getElementById('idProd' + card);
    const nomProdPan = document.getElementById('nomProd' + card);
    const stockProdPan = document.getElementById('stockProd' + card);

    if (idProdPan != null && nomProdPan != null && stockProdPan != null) {
      this.ajoutPanierForm.controls['idProdPan'].setValue(idProdPan.innerText);
      this.ajoutPanierForm.controls['nomProdPan'].setValue(nomProdPan.innerText);
      this.ajoutPanierForm.controls['stockProdPan'].setValue(stockProdPan.innerText);
    }
  }
  affecterValeurProdComs(card: number) {
    const idProdPan = document.getElementById('idProd' + card);
    const nomProdPan = document.getElementById('nomProd' + card);

    if (idProdPan != null && nomProdPan != null) {
      this.ajoutComs.controls['nomProdComs'].setValue(nomProdPan.innerText);
      this.ajoutComs.controls['idProdComs'].setValue(idProdPan.innerText);
    }
  }

  recherche() {
    const searchResults = this.produit.filter((prod: any) => prod.contenu && prod.contenu.includes(this.searchTerm));
    console.log(searchResults);
  }

  // OUVRIR ET FERMER MODAL AJOUTER PANIER
  openModalComs() {
    const id = document.getElementById("utilisateur")?.innerHTML;
    const adr = document.getElementById("adresse")?.innerHTML;
    this.ajoutComs.controls['nomUtilComs'].setValue(adr);
    this.ajoutComs.controls['idUtilComs'].setValue(id);
    this.isModalComs = true;
  };
  closeModalComs() { this.isModalComs = false };


  // FONCTION POUR OUVRIR/FERMER LE MODAL D'AJOUT PANIER

  openModalAjoutPanier() {
    const id = document.getElementById("utilisateur")?.innerHTML;
    const adr = document.getElementById("adresse")?.innerHTML;
    this.ajoutPanierForm.controls['nomUtilisateurPan'].setValue(adr);
    this.ajoutPanierForm.controls['idUtilPan'].setValue(id);
    this.isModalAjoutPanier = true;
  }
  closeModalAjoutPanier() {
    this.ajoutPanierForm.reset();
    this.isModalAjoutPanier = false;
  }



  // AFFICHAGE DE PRODUIT
  fetchProduit() {
    this.service.listeProduit().subscribe(data => {
      this.produit = data;
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

  // AJOUT PANIER
  ajoutPanier() {
    const panier = this.ajoutPanierForm.value;
    const qttModif = this.ajoutPanierForm.value;
    const panierAjout = {
      idUtil: panier.idUtilPan,
      idProd: panier.idProdPan,
      qttPanier: panier.qttProdPan
    }
    const idProd = panier.idProdPan;
    const produit = {
      stockProd: qttModif.stockProdPan - panier.qttProdPan
    }


    if (panier.stockProdPan < panier.qttProdPan) {
      this.toastr.error("Stocke insuffisant", "", { progressBar: true, progressAnimation: "increasing", positionClass: "toast-top-right", timeOut: 3000 })
    } else {
      this.service.ajoutPanier(panierAjout).subscribe(() => {
        this.service.modifierStockProduit(idProd, produit).subscribe()
        this.listePanier();
        this.ajoutPanierForm.reset();
        this.toastr.success("succès", "", { progressBar: true, progressAnimation: "increasing", positionClass: "toast-top-right", timeOut: 3000 })
        this.router.navigateByUrl("utilisateur/panier")

      })
    }
  }

  // MODIFIER QUANTITE PRODUIT
  modifierQttProduit() {
    const qttModif = this.ajoutPanierForm.value;
    const produit = {
      stockProd: qttModif.stockProdPan
    }
  }


  // AJOUTER COMMENTAIRES
  ajoutCommentaire() {
    const commentaire = this.ajoutComs.value;
    const coms = {
      idUtil: commentaire.idUtilComs,
      idProd: commentaire.idProdComs,
      contenuComs: commentaire.contenuComs
    }
    if (commentaire.contenuComs != "") {
      this.service.ajoutCommentaire(coms).subscribe(() => {
        this.ajoutComs.reset();
        this.closeModalComs();
        this.toastr.success("Votre commentaire a envoyée", "", { progressBar: true, progressAnimation: "increasing", positionClass: "toast-top-right", timeOut: 3000 })
      })
    } else {
      this.toastr.error("Ecrivez votre commentaire", "", { progressBar: true, progressAnimation: "increasing", positionClass: "toast-top-right", timeOut: 3000 })
    }
  }


  //Liste panier
  listePanier() {
    const idUtil = this.ajoutPanierForm.value.idUtilPan;
    this.panService.afficherPanier(idUtil).subscribe(data => {
      this.panier = data;
    })
  }
}
