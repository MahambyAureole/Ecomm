import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,Subject } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ServiceBackService {

  private apiUrl = 'http://localhost:8080';
  public productAdded = new Subject<any>();
  public panierAjouter = new Subject<any>();
  
  constructor(private http: HttpClient) { }
  
  // CONNEXION AFFICHAGE ENTRE PRODUIT BACK ET FRONT)
  afficherUtilisateur(): Observable<any> {
    return this.http.get(`${this.apiUrl}/afficheUtil`);
  }

  // CONNEXION AJOUT ENTRE PRODUIT BACK ET FRONT)
  ajoutProduit(produit: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/ajouterProduit`, produit).pipe(
      tap(() => this.productAdded.next(produit))
    );
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

  // CONNEXION AJOUT ENTRE PANIER BACK ET FRONT
  ajoutPanier(panier: any): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/ajoutPanier`, panier).pipe(
      tap(() => this.panierAjouter.next(panier))
    );
  }

  afficherPanier(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/listPanier`);
  }
}
