import { Component, OnInit } from '@angular/core';
import { PaysService } from '../services/pays.service';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Pays } from '../model/pays.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pays',
  templateUrl: './pays.component.html',
  styleUrls: ['./pays.component.css']
})
export class PaysComponent implements OnInit{
  //pays! : Observable<Array<Pays>>;
  //pays! : Pays[];
  paysinfo!: Pays;
  errorMessage : string | undefined; // or errorMessage! : string
  searchFormGroup! : FormGroup;
  paysUpdateform!: FormGroup;
  closeResult: string = '';

  //pays!: Observable<Pays[]>;
  pagedPays!: Observable<Pays[]>;
  page: number = 1;
  pageSize: number = 3;

  currentPage = 1;
  itemsPerPage = 5;

  pays!: Pays[];
  currentIndex = -1;
  keyword = '';

  count = 0;
  pageSizes = [3, 6, 9];

  constructor(private paysService:PaysService, private formBuilder: FormBuilder, private router:Router, private modalService: NgbModal ){};
  ngOnInit(): void {
    
    this.retrievePays();
   
  }
  ngAfterViewInit() {
    this. paysUpdateform =this.formBuilder.group({
      nom : this.formBuilder.control(null, [Validators.required, Validators.minLength(3)]),
      
    });
  }
  getRequestParams(searchKeyWord: string, page: number, pageSize: number): any {
    let params: any = {};

    if (searchKeyWord) {
      params[`keyword`] = searchKeyWord;
    }

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }
  retrievePays(): void {
    const params = this.getRequestParams(this.keyword, this.page, this.pageSize);

    this.paysService.getAll(params)
      .subscribe({
        next: (data) => {
          const { paysList, totalItems } = data;
          this.pays = data;
          this.count = data.length;
          console.log( this.count);
        },
        error: (err) => {
          console.log(err);
        }
      });
  }
  handlePageChange(event: number): void {
    this.page = event;
    this.retrievePays();
  }
  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrievePays();
  }
  clearModal(){
    this.paysUpdateform.reset();
  }
  openEditModal(content: any, pays : any) {
    this.paysinfo = pays;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      if (result === 'save') {
        // Update the student data
        this.paysinfo.nom = this.paysUpdateform.value.nom;
        this.paysService.update( this.paysinfo.id, this.paysinfo)
          .subscribe(response => {
            console.log('Country updated:', response);
          });
      }
      else{
        this.paysUpdateform.reset();
      }
    });
  }
  handleSearchPays(): void {
    this.page = 1;
    this.retrievePays();
  }

  deleteCountry(p: Pays) {
    let conf = confirm("Etes-vous sûr?");
    if(!conf) return;
    this.paysService.delete(p.id).subscribe({
      next : (resp) => {
        this.retrievePays();
      },
      error : err => {
        console.log(err);
      }
    })
  }
 

}
