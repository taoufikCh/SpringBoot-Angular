import { Component, OnInit } from '@angular/core';
import { EntraineursService } from '../services/entraineurs.service';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Entraineur } from '../model/entraineur.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Pays } from '../model/pays.model';
import { PaysService } from '../services/pays.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-entraineurs',
  templateUrl: './entraineurs.component.html',
  styleUrls: ['./entraineurs.component.css']
})
export class EntraineursComponent implements OnInit{
  entraineurs! : Observable<Array<Entraineur>>;
  listPays! : Observable<Array<Pays>>;
  payss!: Pays[];
  entraineurInfo!: Entraineur;
  errorMessage : string | undefined; // or errorMessage! : string
  searchFormGroup! : FormGroup;
  updateform!: FormGroup;
  FormAdd!: FormGroup;
  showSuccessAlert = false;
  messageContent = "";

  constructor(private entraineurService:EntraineursService, private paysService: PaysService, private fb: FormBuilder, private router:Router, private modalService: NgbModal ){};
  get f() { return this.FormAdd.controls; }
  ngOnInit() {
    this.searchFormGroup=this.fb.group({
      keyword : this.fb.control("")
    });
    
    this.handleSearch();
    this.entraineurService.Refreshrequired.subscribe(respone=>{
      this.handleSearch();
    });
    
   
  }
  ngAfterViewInit() {
    this.FormAdd = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      dateNaissance: ['', [Validators.required]],
      pays: [, [Validators.required]],
      salaire: ['', [Validators.required]],
      });

      this.updateform = this.fb.group({
        nom: ['', [Validators.required, Validators.minLength(2)]],
        prenom: ['', [Validators.required, Validators.minLength(2)]],
        dateNaissance: ['', [Validators.required]],
        pays: ['', [Validators.required]],
        salaire: ['', [Validators.required]],
        });


    /*this. FormAdd =this.fb.group({
      nom : this.fb.control(null, [Validators.required, Validators.minLength(2)]),
    });
    this. FormAdd =this.fb.group({
      prenom : this.fb.control(null, [Validators.required, Validators.minLength(2)]),
    });
    this. FormAdd =this.fb.group({
      date_naissance : this.fb.control(null, [Validators.required]),
    });
    this. FormAdd =this.fb.group({
      pays : this.fb.control(null, [Validators.required]),
    });
    this. FormAdd =this.fb.group({
      salaire : this.fb.control(null, [Validators.required]),
    });*/
  }

  handleSearch(){
    let kw = this.searchFormGroup.value.keyword;
    this.entraineurs=this.entraineurService.search(kw).pipe(
      catchError(err => {
        this.errorMessage=err.message;
        return throwError(err);
      })
    );
    console.table(this.entraineurs);
  }
  compareFn(c1: Pays, c2: Pays): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
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
  deleteRow(p: Entraineur) {
    let conf = confirm("Etes-vous sûr?");
    if(!conf) return;
    this.entraineurService.delete(p.id).subscribe({
      next : (resp) => {
        this.entraineurs=this.entraineurs.pipe(
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
    
    this.entraineurInfo = row;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      if (result === 'save') {
        this.entraineurService.update(this.entraineurInfo)
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
   
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    
      //console.log(this.listPays.forEach);
      if (result === 'save') {
        this.saveData();
        //
        
        // Update the student data
        /*this.joueurService.save(this.joueurInfo)
          .subscribe(response => {
            console.log('row saved:', response);
          });*/
      }
      this.FormAdd.reset();
      //this.handleSearch();

    });
  }
  saveData(){
    let entraineur:Entraineur=this.FormAdd.value;
    console.log(entraineur);
    this.entraineurService.save(entraineur).subscribe({
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
}
