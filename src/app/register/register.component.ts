import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService} from '../services/user.service';
import { FormBuilder,FormGroup,Validators }
from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public registerForm!:  FormGroup;
  constructor(public userService: UserService ,public fb: FormBuilder,public toastr: ToastrService,
    private router : Router) { }
  
  ngOnInit() {
  
   
    this.infoForm();
   }

  
  infoForm() {
    this.registerForm = this.fb.group({
        id: null,
        username: ['', [Validators.required, Validators.minLength(5)]],
        role: ['', [Validators.required, Validators.minLength(8)]],
        email: ['', [Validators.required, Validators.minLength(8)]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        pwdd: ['', [Validators.required, Validators.minLength(8)]],
        });
    }
   
  

  ResetForm() {
      this.registerForm.reset();
  }
  onSubmit() {
    const val = this.registerForm.value;
    if (val.password == val.pwdd)
    {
      if (this.userService.choixmenu == "A")
      {
        this.addData();
      }
      else
      {
       this.updateData()
      }
    }
    else
    {
      this.toastr.warning( 'Les mots de passe saisis ne correspondent pas ...');  
    }
}
  
   

addData() {
  this.userService.createData(this.registerForm.value).
  subscribe( data => {
    this.toastr.success( 'Validation Faite avec Success'); 
    this.router.navigate(['/login']);
  });
}
  updateData()
  {
  
    this.userService.updatedata(this.registerForm.value.id,this.registerForm.value).
    subscribe( data => {
      this.toastr.success( 'Modification Faite avec Success');

      this.router.navigate(['/users']);
    });
  }

}
