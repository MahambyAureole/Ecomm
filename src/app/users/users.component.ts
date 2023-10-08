import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { UtilisateurService } from '../service/utilisateur.service';
import { PanierService } from '../service/panier.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  isModalParms = false;
  parmsForm !:FormGroup;
  isDeconnexion= false;
  confirmForm!: FormGroup;
  adrMail$ = this.service.getAdrMail();
  idUtil$ = this.service.getIdUtilisateur();

  constructor(private router: Router, private panService: PanierService ,private service: UtilisateurService, private location: Location, private formBuilder: FormBuilder){
    this.parmsForm = this.formBuilder.group({
      nomUtil: ['', Validators.required],
      prenomUtil: ['', Validators.required],
      adrMail: ['', Validators.required],
      adrUtil: ['', Validators.required],
      numPhone: ['', Validators.required],
      motPasse: ['', Validators.required],
      confirme: ['', Validators.required]
    });
  }
  openModalConfirm() {
    this.isDeconnexion = true;
  }
  closeConfirm(){
    this.isDeconnexion = false;
  }

  ngOnInit(): void{
    this.adrMail$.subscribe();
  }
  deconnecter(){
      this.router.navigateByUrl("authentification");
      this.location.replaceState("authentification");
  }

  panier(){
    this.listePanier();
    this.router.navigateByUrl("utilisateur/panier")
  }

  commentaire(){
    this.router.navigateByUrl("utilisateur/coms")
  }

  produit(){
    this.listePanier();
    this.router.navigateByUrl("utilisateur")
  }

  listePanier() {
    this.panService.afficherPanier("mamyHp@gmail.com").subscribe(data => {
      this.listePanier = data;
      
    });
  }

  openParms(){this.isModalParms = true}
  
  closeParams(){this.parmsForm.reset(); this.isModalParms = false}
}
