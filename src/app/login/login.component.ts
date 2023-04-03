import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';  
import { ToastrService } from 'ngx-toastr';
import { UserService} from '../services/user.service';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
import { Router } from '@angular/router';
import { User} from '../model/user.model';
import { DatePipe }         from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: any={};

  errorMessage!:string;  
  name! : string;  
  Wdate!: any;
  annee! : 0;
  loginForm!:  FormGroup; 
  
  constructor(private router:Router,private userService : UserService,
    public toastr: ToastrService,private datePipe : DatePipe,public fb: FormBuilder) { }    
  ngOnInit() {    
     this.userService.islogin = false;
     this.userService.admin = false;
     this.userService.suser = false;
     this.Wdate = this.transformDate(new Date());
     this.annee = (this.Wdate).toString().substring(0,4);
     localStorage.setItem('annee', this.annee.toString());
     this.loginForm = this.fb.group({
      'username' : [null, Validators.required],
      'password' : [null, Validators.required]
    });
  }    
  login() {
    const val = this.loginForm.value;
    console.log("username : "+val.username);
    console.log("password : "+val.password);
    this.userService.login(val.username, val.password).subscribe(
      res =>{
      this.user = res;
        localStorage.setItem("name", this.user.username);
        localStorage.setItem("role", this.user.role);
       
        let jwt = "Bearer " + this.user.accessToken;
          localStorage.setItem("token", jwt)
          //console.table(this.user);
          console.log("token : "+jwt);
       
         this.userService.islogin = true;
        if (this.user.role  == "Admin")
         {
          console.log("role : "+this.user.role);
         this.userService.admin = true;
          this.router.navigate(['/home']);
      }
      else
      {
        this.userService.suser = true;
        console.log("role : "+this.user.role);
        this.router.navigate(['/home']);
      }
          },
          error => 
          
            this.toastr.warning( 'Login Incorrecte ')
         
          
          );
        }
     
        
        
        logOut() {
          localStorage.removeItem("username");
        }
 

    transformDate(date:any){
      return this.datePipe.transform(date, 'yyyy-MM-dd');
    }
    logout() {
      // remove user from local storage and set current user to null
      localStorage.removeItem('name');
      
  }
}
