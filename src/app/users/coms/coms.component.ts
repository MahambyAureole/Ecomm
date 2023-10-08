import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ServiceBackService } from 'src/app/service-back.service';
import { UtilisateurService } from 'src/app/service/utilisateur.service';

@Component({
  selector: 'app-coms',
  templateUrl: './coms.component.html',
  styleUrls: ['./coms.component.css']
})
export class ComsComponent {
  commentaire!: any[];
  listcommentaire!: any[];
  adrMail$ = this.utilservice.getAdrMail();

  constructor(private service: ServiceBackService, private http: HttpClient, private utilservice: UtilisateurService){}

  listeCommentaire(){
    this.service.listeCommentaire().subscribe(data =>{
      this.commentaire = data;
    })
  }

  listeComsByAdr(){
    this.adrMail$.subscribe(value =>{
      let stringValue = value.toString();
      console.log(stringValue);
      
      this.service.afficheCommentaire(stringValue).subscribe(data => {
        this.listcommentaire = data;
      });
    })
  }
  ngOnInit(): void{
    this.listeComsByAdr();
  }

}
