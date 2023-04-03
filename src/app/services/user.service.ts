import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User} from '../model/user.model';
import { DatePipe } from '@angular/common';
import {environment} from "../../environments/environment.development";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl= environment.backendHost+"/users";
  private baseUrl1 = environment.backendHost+"/users/login";
  islogin = false;
  admin = false;
  suser = false;
  choixmenu : string  = 'A';
  listData! : User[];
  constructor(private http: HttpClient) { }

  login(username:String, password:String) {
     return this.http.post(`${this.baseUrl1}`,{username, password});
   }  
 
  getData(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
 
  createData(info: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/`, info);
  }
  
  updatedata(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }
 
  deleteData(id: number): Observable<any> {
   
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getAll(): Observable<any> {
   
    return this.http.get(`${this.baseUrl}/`);
  }
  /*transformDate(date: Date){
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }*/
}
