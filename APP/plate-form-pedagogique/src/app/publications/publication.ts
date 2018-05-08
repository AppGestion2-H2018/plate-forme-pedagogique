// Définition d’une classe Publication
import {Groupe} from "../groupe/groupe";

export class Publication {
    _id: string;
    auteur: string;
    groupes: Groupe[];
    date_publication: Date;
    titre: string;
    contenu: string;
    date_remise: Date;
    tags: string[];
    //commentaire: string;
    fichier: string;
  }
  