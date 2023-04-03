import { Component, OnInit } from '@angular/core';
import { JoueursService } from '../services/joueurs.service';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Equipe } from '../model/equipe.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Pays } from '../model/pays.model';
import { PaysService } from '../services/pays.service';
import { EquipesService } from '../services/equipes.service';
import { HttpErrorResponse } from '@angular/common/http';
import { GardienDeBut } from '../model/gardientBut.model';
import { JoueurDeMilieun } from '../model/joueurMilieu.model';

import { Joueur } from '../model/joueur.model';

@Component({
  selector: 'app-joueurs',
  templateUrl: './joueurs.component.html',
  styleUrls: ['./joueurs.component.css']
})
export class JoueursComponent implements OnInit{

  joueurs! : Observable<Array<Joueur>>;
  payss!: Pays[];
  equipes!: Equipe[];
  joueurInfo!: Joueur;
  errorMessage : string | undefined; // or errorMessage! : string
  searchFormGroup! : FormGroup;
  updateform!: FormGroup;
  FormAdd!: FormGroup;
  showSuccessAlert = false;
  messageContent = "";
  selectedJoueurType!: any;

  constructor(private equipesService: EquipesService,private joueurService:JoueursService, private paysService: PaysService, private fb: FormBuilder,  private modalService: NgbModal ){};
  get f() { return this.FormAdd.controls; }
  ngOnInit() {
    this.searchFormGroup=this.fb.group({
      keyword : this.fb.control("")
    });
    
    this.handleSearch();
    this.joueurService.Refreshrequired.subscribe(respone=>{
      this.handleSearch();
    });
    
   
  }
  ngAfterViewInit() {
    this.FormAdd = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      dateNaissance: ['', [Validators.required]],
      salaire: ['', [Validators.required]],
      pays: [[Validators.required]],
      equipe: [[Validators.required]],
      TYPE_JOUEUR: ['', [Validators.required]],
      });

      this.updateform = this.fb.group({
        nom: ['', [Validators.required, Validators.minLength(2)]],
        prenom: ['', [Validators.required, Validators.minLength(2)]],
        dateNaissance: ['', [Validators.required]],
        salaire: ['', [Validators.required]],
        pays: [[Validators.required]],
        equipe: [[Validators.required]],
        //TYPE_JOUEUR: ['', [Validators.required]],
        });
  }

  handleSearch(){
    let kw = this.searchFormGroup.value.keyword;
    this.joueurs=this.joueurService.search(kw).pipe(
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

compareEq(e1: Equipe, e2: Equipe): boolean {
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
  getEquipeList(): void {
    this.equipesService.getEquipes().subscribe(
      (response: Equipe[]) => {
        this.equipes = response;
        console.log(this.equipes);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
    // Set the selected country to the country with the ID stored in the student object
  }
  deleteRow(p: Joueur) {
    let conf = confirm("Etes-vous sûr?");
    if(!conf) return;
    this.joueurService.delete(p.id).subscribe({
      next : (resp) => {
        this.joueurs=this.joueurs.pipe(
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
    this.getEquipeList();
    
    this.joueurInfo = row;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      if (result === 'save') {
        this.joueurService.update(this.joueurInfo)
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
    this.getEquipeList();
   
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    
      if (result === 'save') {
        this.saveData();
      }
      this.FormAdd.reset();
      //this.handleSearch();

    });
  }
  saveData(){
    let joueur:Joueur=this.FormAdd.value;
    
    console.log(joueur);
    console.log(this.selectedJoueurType );
    console.log("equipe: "+joueur.equipe );

    if (this.selectedJoueurType === 'gardient_but') {
      this.joueurService.saveGard(joueur).subscribe({
        next : data=>{
          this.showSuccessAlert = true;
          this.messageContent="Données enregistrées avec succès.";
          console.log('data: '+data);
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
    } else {
      this.joueurService.saveMilieu(joueur).subscribe({
        next : data=>{
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
    
  }
}
