import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanierComponent } from './users/panier/panier.component';
import { AuthComponent } from './auth/auth.component';
import { InscriptionComponent } from './auth/inscription/inscription.component';
import { ConnectionComponent } from './auth/connection/connection.component';
import { MenuComponent } from './auth/menu/menu.component';
import { AdminComponent } from './admin/admin.component';
import { ListeProduitComponent } from './admin/liste-produit/liste-produit.component';
import { CommandeComponent } from './admin/commande/commande.component';
import { CommentaireComponent } from './admin/commentaire/commentaire.component';
import { UsersComponent } from './users/users.component';
import { ProduitComponent } from './users/produit/produit.component';
import { ComsComponent } from './users/coms/coms.component';

const routes: Routes = [
  {path:'authentification', component: AuthComponent, children:[
    {path:'', component: MenuComponent},
    {path:'connection', component: ConnectionComponent},
    {path:'inscription', component: InscriptionComponent}
  ]},
  {path:'administrateur', component: AdminComponent, children:[
    {path:'', component: ListeProduitComponent},
    {path:'commande',component: CommandeComponent},
    {path:'commentaire', component: CommentaireComponent}
  ]},
  {path:'utilisateur', component: UsersComponent,children:[
    {path:'', component: ProduitComponent},
    {path:'panier', component: PanierComponent},
    {path:'coms', component: ComsComponent}
  ]},
  {path:'',redirectTo:'authentification', pathMatch:'full'},
  {path:'**', redirectTo: 'authentification', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
