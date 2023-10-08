import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ServiceBackService } from 'src/app/service-back.service';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css']
})
export class CommandeComponent {

  historique!: any[];

  constructor(private service : ServiceBackService, private http: HttpClient){}

  histroriqueCom(){
    this.service.historiqueCommande().subscribe(data =>{
      this.historique = data;
    })
  }

  ngOnInit(): void{
    this.histroriqueCom();
  }

}
