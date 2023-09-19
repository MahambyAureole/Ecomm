import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PanierComponent } from './panier/panier.component';
import { AccueilComponent } from './accueil/accueil.component';

const routes: Routes = [
  {path:'panier', component: PanierComponent},
  {path:'accueil', component: AccueilComponent},
  {path:'',redirectTo:'home', pathMatch:'full'},
  {path:'**', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
