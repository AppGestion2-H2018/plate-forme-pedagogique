import {Utilisateur} from "../class/utilisateur";

export class Classe {
	_id:string;
	nom:string;
	no_groupe:string;
	debut:Date;
	fin:Date;
	utilisateurs:Utilisateur[];
}
