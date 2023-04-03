import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Joueur } from '../model/joueur.model';
import {environment} from "../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class JoueursService {

  constructor(private http:HttpClient) { }

  private _refreshrequired = new Subject<void>();
  api= environment.backendHost+"/joueurs/";

  get Refreshrequired() {
    return this._refreshrequired;
  }

  public getList(): Observable<Array<Joueur>>{
    return this.http.get<Array<Joueur>>(this.api);
  }


  public search(keyword:string): Observable<Array<Joueur>>{
    return this.http.get<Array<Joueur>>(this.api+"search?keyword="+keyword);
  }
 

  public saveGard(joueur: Joueur):Observable<Joueur>{
    //const data = { joueur, typeJoueur };
    //return this.http.post<Joueur>(this.api,{joueur, typeJoueur}).pipe(
    return this.http.post<Joueur>(this.api+"gardient",joueur).pipe(
      tap(()=>{
        this.Refreshrequired.next();
      })
    )
    //this.getList();
  }
  public saveMilieu(joueur: Joueur):Observable<Joueur>{
    return this.http.post<Joueur>(this.api+"milieu",joueur).pipe(
      tap(()=>{
        this.Refreshrequired.next();
      })
    )
  }
  public getJoueursOfTeam(id:number): Observable<Joueur[]> {
    return this.http.get<Joueur[]>(this.api+"team?id="+id);
  }

  public delete(id: number){
    return this.http.delete(this.api+""+id);
  }

  public update(data: Joueur):Observable<Joueur>{
    return this.http.put<Joueur>(this.api,data);
  }
  public getInfoById(id:number): Observable<Joueur>{
    return this.http.get<Joueur>(this.api);
  }
}




