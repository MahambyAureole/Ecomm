import { HttpClient } from '@angular/common/http';
import { Component,ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PanierService } from 'src/app/service/panier.service';
import { UtilisateurService } from 'src/app/service/utilisateur.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent {
  listePanier!: any[];
  somme!: number;
  adrMail$ = this.utilservice.getAdrMail();

  constructor(private service: PanierService, private http: HttpClient, private utilservice: UtilisateurService,private formBuilder: FormBuilder) { 
  }
  
  listPanier() {
    this.adrMail$.subscribe(value =>{
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

  ngOnInit(): void {
    this.listPanier();
    this.adrMail$.subscribe();
  }
}
