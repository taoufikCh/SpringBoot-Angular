import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pays } from '../model/pays.model';
import {environment} from "../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class PaysService {
  //backendHost : string = "http://localhost:8080/";

  constructor(private http:HttpClient) { }

  public getPays(): Observable<Array<Pays>>{
    return this.http.get<Array<Pays>>(environment.backendHost+"/pays/");
  }
  getAll(params: any): Observable<any> {
    return this.http.get<any>(environment.backendHost+"/pays/", { params });
  }

  public getListPays(){
    return this.http.get<Pays>(environment.backendHost+"/pays/");
  }
  public getCountries(): Observable<Pays[]> {
    return this.http.get<Pays[]>(environment.backendHost+"/pays/");
  }
  public getCountries2(keyword:string): Observable<Pays[]> {
    return this.http.get<Array<Pays>>(environment.backendHost +"/pays/search2?keyword="+keyword);
  }
  

  /*public searchPays(keyword:string): Observable<Array<Pays>>{
    return this.http.get<Array<Pays>>(environment.backendHost+"/pays/search?keyword="+keyword);
  }*/
  public searchPays(keyword:string, page:number): Observable<Array<Pays>>{
    //return this.http.get<Array<Pays>>(environment.backendHost+"/pays/search?keyword="+keyword+"&page="+page);
    return this.http.get<Array<Pays>>(environment.backendHost +"/pays/search?keyword="+keyword+"&page="+page);
  }

  public save(country: Pays):Observable<Pays>{
    return this.http.post<Pays>(environment.backendHost+"/pays/",country);
  }
  getUsers(keyword:string,page: number){
    return this.http.get(environment.backendHost +"/pays/search?keyword="+keyword+"&page="+page);
  }

  public delete(id: number){
    return this.http.delete(environment.backendHost+"/pays/"+id);
  }

  public update(id: number, country: Pays):Observable<Pays>{
    return this.http.put<Pays>(environment.backendHost+"/pays/"+id,country);
  }
  public getPaysById(id:number): Observable<Pays>{
    return this.http.get<Pays>(environment.backendHost+"/pays/");
  }
}
