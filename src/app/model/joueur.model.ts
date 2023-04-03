import { Equipe } from "./equipe.model";
import { Pays } from "./pays.model";

export interface Joueur {
    id : number;
    nom : string;
    prenom : string;
    dateNaissance : Date;
	pays: Pays;
    salaire : number;
    nombre_matchs_joues : number;
    /*nombre_matchs_joues! : number;
    nombre_avertissements_recus! : number;
    nombre_avertissements_actifs! : number;
    nombre_expulsions! : number;
    nombre_matchs_suspendus : number;*/
    etat : String;
    equipe : Equipe;
    TYPE_JOUEUR: String;

    nombre_buts_encaisses: number;
    nombre_buts_marques: number;

  }