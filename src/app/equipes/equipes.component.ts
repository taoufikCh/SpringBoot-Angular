
import { Component, OnInit } from '@angular/core';
import { EntraineursService } from '../services/entraineurs.service';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Equipe } from '../model/equipe.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Pays } from '../model/pays.model';
import { PaysService } from '../services/pays.service';
import { EquipesService } from '../services/equipes.service';
import { JoueursService } from '../services/joueurs.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Entraineur } from '../model/entraineur.model';
import { Joueur } from '../model/joueur.model';

@Component({
  selector: 'app-equipes',
  templateUrl: './equipes.component.html',
  styleUrls: ['./equipes.component.css']
})
export class EquipesComponent implements OnInit{

  equipes! : Observable<Array<Equipe>>;
  payss!: Pays[];
  entraineurs!: Entraineur[];
  equipeInfo!: Equipe;
  errorMessage : string | undefined; // or errorMessage! : string
  searchFormGroup! : FormGroup;
  updateform!: FormGroup;
  FormAdd!: FormGroup;
  showSuccessAlert = false;
  messageContent = "";
  equipeSelected = "";
  joueurs!: Joueur[];

  constructor(private equipesService: EquipesService,private entraineurService:EntraineursService, private paysService: PaysService,private joueurService: JoueursService, private fb: FormBuilder, private router:Router, private modalService: NgbModal ){};
  get f() { return this.FormAdd.controls; }
  ngOnInit() {
    this.searchFormGroup=this.fb.group({
      keyword : this.fb.control("")
    });
    
    this.handleSearch();
    this.equipesService.Refreshrequired.subscribe(respone=>{
      this.handleSearch();
    });
    
   
  }
  ngAfterViewInit() {
    this.FormAdd = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      date_creation: ['', [Validators.required]],
      pays: [[Validators.required]],
      entraineur: ['', [Validators.required]],
      });

      this.updateform = this.fb.group({
        nom: ['', [Validators.required, Validators.minLength(2)]],
        date_creation: ['', [Validators.required]],
        pays: [, [Validators.required]],
        entraineur: ['', [Validators.required]],
        });
  }

  handleSearch(){
    let kw = this.searchFormGroup.value.keyword;
    this.equipes=this.equipesService.search(kw).pipe(
      catchError(err => {
        this.errorMessage=err.message;
        return throwError(err);
      })
    );
    //console.table(this.equipes);
  }
  compareFn(c1: Pays, c2: Pays): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
}

compareEn(e1: Entraineur, e2: Entraineur): boolean {
  return e1 && e2 ? e1.id === e2.id : e1 === e2;
}


  getPayslist(): void {
    this.paysService.getCountries().subscribe(
      (response: Pays[]) => {
        this.payss = response;
        console.log(this.payss);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
    // Set the selected country to the country with the ID stored in the student object
  }
  getPlayersList(id: any): void {
    this.joueurService.getJoueursOfTeam(id).subscribe(
      (response: Joueur[]) => {
        this.joueurs = response;
        console.log(this.joueurs);
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
    // Set the selected country to the country with the ID stored in the student object
  }
  getEntraineurList(): void {
    this.entraineurService.getEntraineurs().subscribe(
      (response: Entraineur[]) => {
        this.entraineurs = response;
        console.log(this.entraineurs);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
    // Set the selected country to the country with the ID stored in the student object
  }
  deleteRow(p: Equipe) {
    let conf = confirm("Etes-vous sûr?");
    if(!conf) return;
    this.equipesService.delete(p.id).subscribe({
      next : (resp) => {
        this.equipes=this.equipes.pipe(
          map(data=>{
            let index=data.indexOf(p);
            data.slice(index,1)
            return data;
          })
        );
        this.showSuccessAlert = true;
            this.messageContent="Ligne supprimée avec succès..";
            // Clear the success alert after 3 seconds
            setTimeout(() => {
              this.showSuccessAlert = false;
              this.messageContent="";
            }, 3000);
      },
      error : err => {
        console.log(err);
      }
    })
  }
 
  getInfoById(id : number){
   
  }

  openEditModal(content: any, row : any) {
    this.getPayslist();
    this.getEntraineurList();
    
    this.equipeInfo = row;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      if (result === 'save') {
        this.equipesService.update(this.equipeInfo)
          .subscribe(response => {
            console.log('row updated:', response);
            this.showSuccessAlert = true;
            this.messageContent="Données mises à jour avec succès.";
            // Clear the success alert after 3 seconds
            setTimeout(() => {
              this.showSuccessAlert = false;
              this.messageContent="";
            }, 3000);
            });
      }
      else{
        this.updateform.reset();
      }
    });
  }
  
  openAddModal(content: any) {
    this.getPayslist();
    this.getEntraineurList();
   
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    
      if (result === 'save') {
        this.saveData();
      }
      this.FormAdd.reset();
      //this.handleSearch();

    });
  }
  saveData(){
    let equipe:Equipe=this.FormAdd.value;
    console.log(equipe);
    this.equipesService.save(equipe).subscribe({
      next : data=>{
        //alert("Les données ont été enregistré avec succès!");
        this.showSuccessAlert = true;
        this.messageContent="Données enregistrées avec succès.";


        // Clear the success alert after 3 seconds
        setTimeout(() => {
          this.showSuccessAlert = false;
          this.messageContent="";
        }, 3000);
      },
      error : err => {
        console.log(err);
      }
    });
  }
  openPlayersModal(content: any, row : any) {
    this.getPlayersList(row.id);
    this.equipeSelected=row.nom;
    
    this.modalService.open(content, { size: 'xl' , ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      if (result === 'cancel') {
        this.joueurs = [];
        this.equipeSelected="";
      }
    });
  }
}

