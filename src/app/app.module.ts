import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastContainerDirective, ToastrModule } from 'ngx-toastr';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AdminComponent } from './admin/admin.component';
import { UsersComponent } from './users/users.component';
import { InscriptionComponent } from './auth/inscription/inscription.component';
import { ConnectionComponent } from './auth/connection/connection.component';
import { MenuComponent } from './auth/menu/menu.component';
import { ListeProduitComponent } from './admin/liste-produit/liste-produit.component';
import { CommentaireComponent } from './admin/commentaire/commentaire.component';
import { CommandeComponent } from './admin/commande/commande.component';
import { ProduitComponent } from './users/produit/produit.component';
import { ComsComponent } from './users/coms/coms.component';
import { PanierComponent } from './users/panier/panier.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    AdminComponent,
    UsersComponent,
    InscriptionComponent,
    ConnectionComponent,
    MenuComponent,
    ListeProduitComponent,
    CommentaireComponent,
    CommandeComponent,
    ProduitComponent,
    PanierComponent,
    ComsComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,  
    ToastrModule.forRoot({positionClass: 'inline'}),
    ToastContainerDirective,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      {path:'',redirectTo:'authentification', pathMatch:'full'},
      {path:'authentification', component: AuthComponent, children:[
        {path:'connection', component: ConnectionComponent},
        {path:'inscription', component: InscriptionComponent},
        {path:'',redirectTo:'connection', pathMatch:'full'},
        {path:'**', redirectTo: 'inscription', pathMatch: 'full'}
      ]},
      {path:'**', redirectTo: 'authentification', pathMatch: 'full'}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
