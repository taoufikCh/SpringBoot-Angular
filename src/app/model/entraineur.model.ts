import { Pays } from "./pays.model";

export interface Entraineur {
    id : number;
    nom : string;
    prenom : string;
    dateNaissance : Date;
	pays: Pays;
    salaire : number;
    nombreMatchsJoues : number;
  }

  