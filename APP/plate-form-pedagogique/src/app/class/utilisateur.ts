// Définition d'un Utilisateur
export class Utilisateur {
    da: string;
    nom: string;
    prenom: string;
    courriel: string;
    datedenaissance: Date;
    codepermanent: string;
    programme: number;  // TODO : ObjectID
    sexe: string;
    role: string;  // TODO : ObjectID
    motdepasse: string;
    photo: string;
}
