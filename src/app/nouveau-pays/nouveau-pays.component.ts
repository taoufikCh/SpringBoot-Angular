import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Pays } from '../model/pays.model';
import { PaysService } from '../services/pays.service';

@Component({
  selector: 'app-nouveau-pays',
  templateUrl: './nouveau-pays.component.html',
  styleUrls: ['./nouveau-pays.component.css']
})
export class NouveauPaysComponent implements OnInit {
  newCountryFormGroup! : FormGroup;
  constructor(private fb : FormBuilder, private paysService:PaysService,  private router:Router){};
  ngOnInit(): void {
    this. newCountryFormGroup =this.fb.group({
      nom : this.fb.control(null, [Validators.required, Validators.minLength(3)]),
    });
  }
  savePays(){
    let pays:Pays=this.newCountryFormGroup.value;
    this.paysService.save(pays).subscribe({
      next : data=>{
        alert("Pays has been successfully saved!");
        //this.newCustomerFormGroup.reset();
        this.router.navigateByUrl("/pays");
      },
      error : err => {
        console.log(err);
      }
    });
  }
  
  
}
