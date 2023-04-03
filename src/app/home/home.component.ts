import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  //nom!: String ;
  role! :string| null;
  nom!: string | null;
  ngOnInit(): void {
    this.nom = localStorage.getItem('name');
    this.role = localStorage.getItem('role');
  }
}
