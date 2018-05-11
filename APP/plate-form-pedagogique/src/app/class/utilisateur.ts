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
    role: string;  // TODO : ObjectID
    motdepasse: string;
    photo: string;
}
