import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  private apiUrl = 'http://localhost:8080';
  
  constructor(private http: HttpClient) { }
  
  private data = new BehaviorSubject<string>('');
  private dt = new BehaviorSubject<number>(0);
  private pr = new BehaviorSubject<number>(0);

  //Ajout Utilisateur
  ajoutUtil(utilisateur: any, options?: any): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/ajoutUtil`,utilisateur, options);
  }

  getAdrMail() {
    return this.data.asObservable();
  }

  setAdrMail(adrMail: string) {
    this.data.next(adrMail);
  }

  getIdUtilisateur(){
    return this.dt.asObservable();
  }

  setIdUtilisateur(idUtil: number){
    this.dt.next(idUtil);
  }

  getIdProd(){
    return this.data.asObservable();
  }

  setIdProd(idProd: number){
    this.pr.next(idProd);
  }
}
