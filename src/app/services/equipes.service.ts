import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Equipe } from '../model/equipe.model';
import {environment} from "../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class EquipesService {

  constructor(private http:HttpClient) { }
  private _refreshrequired = new Subject<void>();
  api= environment.backendHost+"/equipes/";

  get Refreshrequired() {
    return this._refreshrequired;
  }
  public getList(): Observable<Array<Equipe>>{
    return this.http.get<Array<Equipe>>(this.api);
  }
  public getEquipes(): Observable<Equipe[]> {
    return this.http.get<Equipe[]>(this.api);
  }
  public search(keyword:string): Observable<Array<Equipe>>{
    return this.http.get<Array<Equipe>>(this.api+"search?keyword="+keyword);
  }
 

  public save(data: Equipe):Observable<Equipe>{
    return this.http.post<Equipe>(this.api,data).pipe(
      tap(()=>{
        this.Refreshrequired.next();
      })
    )
  }
  

  public delete(id: number){
    return this.http.delete(this.api+""+id);
  }

  public update(data: Equipe):Observable<Equipe>{
    return this.http.put<Equipe>(this.api,data);
  }
  public getInfoById(id:number): Observable<Equipe>{
    return this.http.get<Equipe>(this.api);
  }
}


