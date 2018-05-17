// Définition d'un Utilisateur
export class Utilisateur {
    _id: string;
    da: string;
    nom: string;
    prenom: string;
    courriel: string;
    datedenaissance: Date;
    codepermanent: string;
    programme: string;  // TODO : ObjectID
    sexe: string;
    type: string;  // TODO : ObjectID
    motdepasse: string;
    photo: string;
}
