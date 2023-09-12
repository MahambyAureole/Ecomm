import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceBackService {

  private apiUrl = 'http://localhost:8080';
  
  constructor(private http: HttpClient) { }
  
  // CONNEXION AFFICHAGE ENTRE PRODUIT BACK ET FRONT)
  afficherUtilisateur(): Observable<any> {
    return this.http.get(`${this.apiUrl}/afficheUtil`);
  }

  // CONNEXION AJOUT ENTRE PRODUIT BACK ET FRONT)
  ajoutProduit(produit: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/ajouterProduit`, produit);
  }

  // CONNEXION LISTE ENTRE PRODUIT BACK ET FRONT)
  listeProduit(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/listeProduit`);
  }

  // CONNEXION MODIFIER ENTRE PRODUIT BACK ET FRONT)
  modifierProduit( idProd: number,produit: any): Observable<any>{
    return this.http.patch<any>(`${this.apiUrl}/modifierProd/${idProd}`, produit);
  }

  // CONNEXION SUPPRIMER ENTRE PRODUIT BACK ET FRONT)
  supprimerProduit(idProd: number):Observable<Object>{
    return this.http.delete(`${this.apiUrl}/effaceProd/${idProd}`);
  }

}
