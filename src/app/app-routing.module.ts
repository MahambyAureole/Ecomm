import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanierComponent } from './panier/panier.component';
import { AccueilComponent } from './accueil/accueil.component';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';

const routes: Routes = [
  {path:'accueil', component: AccueilComponent},
  {path:'panier', component: PanierComponent},
  {path:'utilisateur', component: UtilisateurComponent},
  {path:'',redirectTo:'accueil', pathMatch:'full'},
  {path:'**', redirectTo: 'accueil', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
