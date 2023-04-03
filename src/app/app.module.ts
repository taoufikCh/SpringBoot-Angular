import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JoueursComponent } from './joueurs/joueurs.component';
import { EquipesComponent } from './equipes/equipes.component';
import { NavbarComponent } from './navbar/navbar.component';
import {HttpClientModule} from "@angular/common/http";
import { PaysComponent } from './pays/pays.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NouveauPaysComponent } from './nouveau-pays/nouveau-pays.component';
import { EntraineursComponent } from './entraineurs/entraineurs.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { RegisterComponent } from './register/register.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { DatePipe } from '@angular/common';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    JoueursComponent,
    EquipesComponent,
    NavbarComponent,
    PaysComponent,
    NouveauPaysComponent,
    EntraineursComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,//pour traiter les formulaires
    NgxPaginationModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
