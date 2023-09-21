import { Component } from '@angular/core';
import { PanierService } from '../service/panier.service';
import { HttpClient } from '@angular/common/http';
import { ServiceBackService } from '../service-back.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent {
  panier!: any[];

  constructor(private service: PanierService, private servicePanier: ServiceBackService, private http: HttpClient){

  }

  // Liste des paniers
  listePanier(){
    this.service.afficherPanier().subscribe(data=>{
      this.panier = data;
    })
  }

  ngOnInit(): void{
    this.listePanier();
    this.servicePanier.panierAjouter.subscribe(() => {
      this.listePanier();
    });
  }
}
