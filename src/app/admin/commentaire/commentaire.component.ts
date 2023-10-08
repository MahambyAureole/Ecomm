import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServiceBackService } from 'src/app/service-back.service';

@Component({
  selector: 'app-commentaire',
  templateUrl: './commentaire.component.html',
  styleUrls: ['./commentaire.component.css']
})
export class CommentaireComponent {
  commentaire!: any[];

  constructor(private service: ServiceBackService, private http: HttpClient){}

  listeCommentaire(){
    this.service.listeCommentaire().subscribe(data =>{
      this.commentaire = data;
    })
  }

  ngOnInit(): void{
    this.listeCommentaire();
  }
}
