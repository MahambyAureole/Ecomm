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

  // AFFICHAGE HISTORIQUE DES COMMANDES
  historiqueCommande(): Observable<any>{
    return this.http.get(`${this.apiUrl}/histoCommande`);
  }

  // AFFICHAGE LISTES COMMENTAIRES RECU

  listeCommentaire(): Observable<any>{
    return this.http.get(`${this.apiUrl}/listecommentaire`);
  }

  // AFFICHAGE PANIER

  listePanier(): Observable<any>{
    return this.http.get(`${this.apiUrl}/listePanier`);
  }

  // CONNEXION AJOUT ENTRE PRODUIT BACK ET FRONT)
  ajoutProduit(produit: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/ajouterProduit`, produit).pipe(
      tap(() => this.productAdded.next(produit))
    );
  }
  // VERIFICATION DE L'UTILISATEUR
  login(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, user);
  }

  // RECUPERER ID UTILISATEUR
  getIdUtil(user: any): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/getId`, user);
  }
  
  // VERIFICATION DE L'ADMINISTRATEUR
  loginAdmin(admin: any): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/loginAdmin`, admin);
  }

  // CONNEXION LISTE ENTRE PRODUIT BACK ET FRONT)
  listeProduit(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/listeProduit`);
  }

  // CONNEXION MODIFIER ENTRE PRODUIT BACK ET FRONT)
  modifierProduit( idProd: number,produit: any): Observable<any>{
    return this.http.patch<any>(`${this.apiUrl}/modifierProd/${idProd}`, produit);
  }

  //MODIFIER STOCK PRODUIT
  modifierStockProduit(idProd: number, produit: any): Observable<any>{
    return this.http.put<any>(`${this.apiUrl}/modifierStockProd/${idProd}`,produit);
  }

  // CONNEXION SUPPRIMER ENTRE PRODUIT BACK ET FRONT)
  supprimerProduit(idProd: number):Observable<Object>{
    return this.http.delete(`${this.apiUrl}/effaceProd/${idProd}`);
  }
  // AFFICHE IMAGE PRODUIT
  getImage(idProd: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/image/${idProd}`, { responseType: 'blob' });
  }

  // CONNEXION AJOUT ENTRE PANIER BACK ET FRONT
  ajoutPanier(panier: any): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/ajoutPanier`, panier).pipe(
      tap(() => this.panierAjouter.next(panier))
    );
  }

  //AJOUT COMMENTAIRE
  ajoutCommentaire(commentaire: any) : Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/ajoutComs`, commentaire);
  }

  // AFFICHAGE COMMENTAIRE BY ADRMAIL
  afficheCommentaire(adrMail: any): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/listComs/${adrMail}`);
  }

  afficherPanier(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/listPanier`);
  }
}
