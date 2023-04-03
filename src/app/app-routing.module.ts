import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntraineursComponent } from './entraineurs/entraineurs.component';
import { EquipesComponent } from './equipes/equipes.component';
import { JoueursComponent } from './joueurs/joueurs.component';
import { NouveauPaysComponent } from './nouveau-pays/nouveau-pays.component';
import { PaysComponent } from './pays/pays.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AuthGaurdService } from './services/auth-gaurd.service';
import { NavbarComponent } from './navbar/navbar.component';

const routes: Routes = [
  { path :"", component : NavbarComponent,canActivate:[AuthGaurdService], children:[
  { path :"joueurs", component : JoueursComponent},
  { path :"equipes", component : EquipesComponent},
  { path :"pays", component : PaysComponent},
  { path :"addCountry", component : NouveauPaysComponent},
  { path :"entraineurs", component : EntraineursComponent},
  { path: "home", component: HomeComponent},
  ]},
  { path: "inscription", component: RegisterComponent},
  { path: "login", component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
