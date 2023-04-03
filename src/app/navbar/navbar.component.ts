import { Component, OnInit } from '@angular/core';
import { UserService} from '../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  //nom!: String ;
  role! :string| null;
  nom!: string | null;
    constructor( public userService : UserService) { }
  
    ngOnInit(): void {
       this.nom = localStorage.getItem('name');
       this.role = localStorage.getItem('role');
     }
  
    public logout() {
      localStorage.removeItem('name');
      localStorage.removeItem('role');
      localStorage.removeItem('token');
      this.userService.islogin = false;
      ///this.router.navigate(['/login']);
      location.reload();
    }

}
