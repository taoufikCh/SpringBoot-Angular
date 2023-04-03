import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Entraineur } from '../model/entraineur.model';
import {environment} from "../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class EntraineursService {

  constructor(private http:HttpClient) { }
  private _refreshrequired = new Subject<void>();

  get Refreshrequired() {
    return this._refreshrequired;
  }
  public getList(): Observable<Array<Entraineur>>{
    return this.http.get<Array<Entraineur>>(environment.backendHost+"/entraineurs/");
  }
  public getEntraineurs(): Observable<Entraineur[]> {
    return this.http.get<Entraineur[]>(environment.backendHost+"/entraineurs/");
  }

  public search(keyword:string): Observable<Array<Entraineur>>{
    return this.http.get<Array<Entraineur>>(environment.backendHost+"/entraineurs/search?keyword="+keyword);
  }
 

  public save(country: Entraineur):Observable<Entraineur>{
    return this.http.post<Entraineur>(environment.backendHost+"/entraineurs/",country).pipe(
      tap(()=>{
        this.Refreshrequired.next();
      })
    )
    this.getList();
  }
  

  public delete(id: number){
    return this.http.delete(environment.backendHost+"/entraineurs/"+id);
  }

  public update(country: Entraineur):Observable<Entraineur>{
    return this.http.put<Entraineur>(environment.backendHost+"/entraineurs/",country);
  }
  public getInfoById(id:number): Observable<Entraineur>{
    return this.http.get<Entraineur>(environment.backendHost+"/entraineurs/");
  }
}

