import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceBackService } from 'src/app/service-back.service';
import * as CryptoJS from 'crypto-js';
import { UtilisateurService } from 'src/app/service/utilisateur.service';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css']
})
export class ConnectionComponent {
  selectedOption!: string;
  user!: any[];
  constructor(private router: Router, private location: Location, private toastr: ToastrService, private service: ServiceBackService, private utilServe: UtilisateurService) { }

  // RETOUR AU MENU
  goToMenu() {
    this.router.navigateByUrl('authentification');
    this.location.replaceState("authentification");
  }

  // AUTHENTIFICATION
  connecter() {
    let adrMailElement = document.getElementById('adrMail');
    let motPasseElement = document.getElementById('motPasse');

    if (adrMailElement instanceof HTMLInputElement && motPasseElement instanceof HTMLInputElement) {
      try {
        let adrMail = adrMailElement.value;
        let motPasse = motPasseElement.value;
        let utilisateur = {
          "adrMail": adrMail,
          "motPasse": CryptoJS.SHA256(motPasse).toString()
        }
        let admin = {
          "nomAdmin": adrMail,
          "motPasseAdmin": motPasse
        }
        if(this.selectedOption == "Administrateur"){
          this.service.loginAdmin(admin).subscribe(data =>{
            let adresse = data.nomAdmin
            if (adresse == adrMail && this.selectedOption == "Administrateur") {
              this.utilServe.setAdrMail(adresse);
              this.router.navigateByUrl("administrateur");
              this.location.replaceState("administrateur");
            } else{
              this.toastr.error("Vérifier votre adresse email ou mot de passe ou rôle", "", {progressBar: true, progressAnimation:"increasing", positionClass: "toast-top-right", timeOut: 3000 });
            }
            
          })
        } else if (this.selectedOption == "Utilisateur"){
          this.service.login(utilisateur).subscribe(data => {
            let adr = data.adrMail
            if (adrMail === adr && this.selectedOption == "Utilisateur") {
              this.service.getIdUtil(utilisateur).subscribe(data =>{
                let idUtil = data.idUtil
                this.utilServe.setIdUtilisateur(idUtil);
              });
              this.utilServe.setAdrMail(adr);
              this.router.navigateByUrl("utilisateur");
              this.location.replaceState("utilisateur");
            } else{
              this.toastr.error("Vérifier votre adresse email ou mot de passe ou rôle", "", {progressBar: true, progressAnimation:"increasing", positionClass: "toast-top-right", timeOut: 3000 });
            }
          });
        } else{
          this.toastr.error("Veuillez selectionner votre rôle!!","", {progressBar: true, progressAnimation:"increasing",positionClass:"toast-top-right", timeOut: 3000});
        }
      } catch (error) {
        console.error(error);
      }
    }
    else {
    }
  }

}
