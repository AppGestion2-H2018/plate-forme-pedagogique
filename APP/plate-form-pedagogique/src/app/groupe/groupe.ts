import {Programme} from "./programme";
import {Type} from "./type";
import {Utilisateur} from "../class/utilisateur";
import {Classe} from "./classe";

export class Groupe {
    _id: string;
    nom: string;
    proprietaire: string;
    date_fin: Date;
    description: string;
    actif: boolean;
    est_publique: boolean;
    commenter: boolean;
    super_admins: Utilisateur[];
    admins: Utilisateur[];
    programmes: Programme[];
    classes: Classe[];
    types: Type[];
    utilisateurs: Utilisateur[];
    blacklist: Utilisateur[];
}