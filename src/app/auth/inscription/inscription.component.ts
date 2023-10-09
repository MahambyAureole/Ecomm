import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilisateurService } from 'src/app/service/utilisateur.service';
import { ToastrService } from 'ngx-toastr';
import * as CryptoJS from 'crypto-js';
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent {
  ajoutUtilForm!: FormGroup;
  emailInvalid = false;
  passwordInvalid = true;

  constructor(private router: Router, private location: Location, private formeBuilder: FormBuilder, private service: UtilisateurService, private toastr: ToastrService) {
    this.ajoutUtilForm = this.formeBuilder.group({
      nomUtil: ['', Validators.required],
      prenomUtil: ['', Validators.required],
      adrMail: ['', Validators.required, Validators.email],
      adrUtil: ['', Validators.required],
      motPasse: ['', Validators.required,Validators.minLength(6)],
      numPhone: ['', Validators.required],
      confirmeMotPass: ['', Validators.required]
    })
  }

  goToMenu() {
    this.router.navigateByUrl('authentification');
    this.location.replaceState("authentification");
  }

  // VALIDATION EMAIL

  emailValidator(domain: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const forbidden = !control.value.endsWith(domain);
      return forbidden ? { 'forbiddenEmail': { value: control.value } } : null;
    };
  }
  validateEmail() {
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    this.emailInvalid = !regex.test(email);
  }
  validatePassword() {
    const password = (document.getElementById('password') as HTMLInputElement).value;
    this.passwordInvalid = password.length < 6;
  }



  ajoutUtil(event: Event) {
    const utilisateurA = this.ajoutUtilForm.value;
    const utilisateur = {
      "nomUtil": utilisateurA.nomUtil,
      "prenomUtil": utilisateurA.prenomUtil,
      "adrMail": utilisateurA.adrMail,
      "adrUtil": utilisateurA.adrUtil,
      "motPasse": CryptoJS.SHA256(utilisateurA.motPasse).toString(),
      "numPhone": utilisateurA.numPhone
    }
    if (utilisateurA.nomUtil != "" && utilisateurA.confirmeMotPass != "" && utilisateurA.prenomUti != "" && utilisateurA.adrMail != "" && utilisateurA.adrUtil != "" && utilisateurA.numPhone != "") {
      if (utilisateurA.motPasse == utilisateurA.confirmeMotPass) {
        this.service.ajoutUtil(utilisateur, { responseType: 'text' }).subscribe(() => {
          this.ajoutUtilForm.reset();
          this.toastr.success("Votre compte a été créée avec succès", "", { progressBar: true, progressAnimation: "increasing", positionClass: "toast-top-right", timeOut: 3000 });
        });
      } else {
        this.toastr.error("Veuillez vérifier votre mot de passe", "", { progressBar: true, progressAnimation: "increasing", positionClass: "toast-top-right", timeOut: 3000 });
      }
    } else {
      this.toastr.error("veuillez completer le champ vide", "", { progressBar: true, progressAnimation: "increasing", positionClass: "toast-top-right", timeOut: 3000 })
    }
    event.preventDefault();
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

  controlenomText(event: any) {
    const inputValeur = event.target.value;
    if (/[^A-Za-z ]/.test(inputValeur)) {
      const index = inputValeur.search(/A-Za-z /)
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

  majuscule(event: any) {
    const inputElement = event.target as HTMLInputElement;
    inputElement.value = inputElement.value.toUpperCase();
}
}
