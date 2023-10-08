import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  private apiUrl = 'http://localhost:8080';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  // CONNEXION AFFICHAGE PANIER ENTRE BACK ET FRONT)
  afficherPanier(adrMail: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/listPan/${adrMail}`);
  }

  //RECUPERER ID PROD
  getIdProd(prod: any): Observable<any> {
    const body = JSON.stringify(prod);
    return this.http.post<any>(`${this.apiUrl}/getIdProd`, body,this.httpOptions)
  }

  ajouterCommande(commande: any):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/ajoutCommande`,commande);
  }

}
