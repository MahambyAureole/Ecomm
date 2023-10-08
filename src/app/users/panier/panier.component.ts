import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PanierService } from 'src/app/service/panier.service';
import { UtilisateurService } from 'src/app/service/utilisateur.service';
import { forkJoin } from 'rxjs';
import { KeyValue } from '@angular/common';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent {
  listePanier!: any[];
  somme!: number;
  adrMail$ = this.utilservice.getAdrMail();
  idUtil$ = this.utilservice.getIdUtilisateur();
  idprod$ = this.utilservice.getIdProd();

  constructor(private toastr: ToastrService ,private service: PanierService, private http: HttpClient, private utilservice: UtilisateurService, private formBuilder: FormBuilder) {
  }

  listPanier() {
    this.adrMail$.subscribe(value => {
      let stringValue = value.toString();
      this.service.afficherPanier(stringValue).subscribe(data => {
        this.listePanier = data;
        this.calculeSomme();
      });
    })
  }


  calculeSomme() {
    this.somme = 0;
    for (let listepan of this.listePanier) {
      this.somme += listepan.total;
    }
  }
  

  ajoutProd() {
    this.idUtil$.subscribe(value =>{
      let id = value;
      console.log(id);
      const nomProduit ={ nomProd: this.listePanier.map(listepan => listepan.nomProd)}
      const prod = {qttProd: this.listePanier.map(listepan => listepan.qttPanier)};

      const observables = nomProduit.nomProd.map((nomProd,index)=>{
        const pr = {nomProd: nomProd};
        return this.service.getIdProd(pr).pipe(
          map(data => ({idUtil: id, qttCom: prod.qttProd[index], idProd: data.idProd}))
        );
      });

      forkJoin(observables).subscribe(results => 
        {results.forEach(result =>{
        this.service.ajouterCommande(result).subscribe(() =>{
          this.toastr.success("commande ajoutée avec succès", "", {progressBar: true, progressAnimation:"increasing", positionClass: "toast-top-right", timeOut: 3000 });
        });
        });
      });
    });
  }

  // ajoutProd2(){
  //   const nomProduit = this.listePanier.map(listepan => listepan.nomProd);
  //   const qttProd = this.listePanier.map(listepan => listepan.qttPanier);

  //   this.idUtil$.subscribe(value => {
  //     const id = value;

  //     const commandes: any[] = [];

  //     for (let i = 0; i < qttProd.length; i++) {
  //       const commande = {
  //         idUtil: id,
  //         qttCom: qttProd[i],
  //         idProd: null
  //       };
        
  //       const pr = { nomProd: nomProduit[i] };
  //       this.service.getIdProd(pr).subscribe(data => {
  //         commande.idProd = data.idProd;
  //         commandes.push(commande);

  //         if (commandes.length === qttProd.length) {
  //           this.ajouterEnBoucle(commandes);
  //         }
  //       });
  //     }
  //   });
  // }

  // ajouterEnBoucle(commandes: any[]) {
  //   for (const commande of commandes) {
  //     this.service.ajouterCommande(commande).subscribe(response => {
  //       console.log('Commande ajoutée avec succès :', response);
  //       this.toastr.success("commande ajoutée avec succès", "", {progressBar: true, progressAnimation:"increasing", positionClass: "toast-top-right", timeOut: 3000 });
  //     });
  //   }
  // }

  ngOnInit(): void {
    this.listPanier();
    this.adrMail$.subscribe();
  }
}
