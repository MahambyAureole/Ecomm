import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  private apiUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) { }

  // CONNEXION AFFICHAGE PANIER ENTRE BACK ET FRONT)
  afficherPanier(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/listPanier`);
  }
}
