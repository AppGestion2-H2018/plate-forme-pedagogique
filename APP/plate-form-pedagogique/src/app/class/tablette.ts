// Définition d’une classe tablette
import {Livre} from "./livre";

export class Tablette {
    id: number;
    user: string;
    nom: string;
    livres: Livre[];
}