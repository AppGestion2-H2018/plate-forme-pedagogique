<<<<<<< HEAD
export class Event {
    _id: string;
    text: string;
    description: string;
    categorie: string;
=======
// import {JsonObject, JsonProperty} from "json2typescript";
// Définition d’une classe Evenement
export class Event {
    id: string;
    // @JsonProperty('date_debut')
>>>>>>> 51e98a862408bd00f4da8c87fd0e4525566a49bc
    start_date: string;
    end_date: string;
    text: string;
    active: boolean;
    // @JsonProperty('description')
    description: string;
    categorie: string;
    type: string;
    admin_id:string;
    group_id: string;
}
