import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilisateurService } from '../service/utilisateur.service';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.css']
})
export class UtilisateurComponent {
  ajoutUtilForm!: FormGroup;

  constructor(private formeBuilder: FormBuilder, private service: UtilisateurService, private toastr: ToastrService){
    this.ajoutUtilForm = this.formeBuilder.group({
      nomUtil: ['', Validators.required],
      prenomUtil: ['', Validators.required],
      adrMail: ['', Validators.required],
      adrUtil: ['', Validators.required],
      motPasse: ['', Validators.required],
      numPhone: ['', Validators.required],
      confirmeMotPass: ['',Validators.required]
    })

  }

  // AJOUT PANIER
  ajoutUtil(event: Event) {
    const utilisateurA = this.ajoutUtilForm.value;
    const utilisateur ={
      nomUtil: utilisateurA.nomUtil,
      prenomUtil: utilisateurA.prenomUtil,
      adrMail: utilisateurA.adrMail,
      adrUtil: utilisateurA.adrUtil,
      motPasse: CryptoJS.SHA256(utilisateurA.motPasse).toString(),
      numPhone: utilisateurA.numPhone
    }
    // console.log(utilisateur);
    
    this.service.ajoutUtil(utilisateur).pipe(
      catchError(error => {
        console.error('Une erreur est survenue !', error);
        return throwError(error);
      })
    ).subscribe(() => {
      this.ajoutUtilForm.reset();
      this.toastr.success("Produit ajouté avec succès", "Notification", { positionClass: "toast-top-right", timeOut: 1000 });
    });
    event.preventDefault();
  }
}
