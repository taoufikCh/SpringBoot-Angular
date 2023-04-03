import { Entraineur } from "./entraineur.model";
import { Pays } from "./pays.model";

export interface Equipe {
    id : number;
    nom : string;
    date_creation : Date;
	pays: Pays;
    entraineur : Entraineur;
  }
    
  