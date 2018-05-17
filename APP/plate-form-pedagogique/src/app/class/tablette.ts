// Définition d’une classe tablette
import {Livre} from "./livre";

export class Tablette {
    id: string;
    user: string;
    nom: string;
    livres: Livre[];
}