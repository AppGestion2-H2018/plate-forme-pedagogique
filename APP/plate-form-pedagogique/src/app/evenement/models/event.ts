// import {JsonObject, JsonProperty} from "json2typescript";
// Définition d’une classe Evenement
export class Event {
    id: string;
    // @JsonProperty('date_debut')
    start_date: string;
    // @JsonProperty('date_fin')
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

//     @JsonProperty('description')
//     getdescription() : string {
//         return "text";
//     }
//
//     @JsonProperty('date_debut')
//     getdate_debut(){
//         return "start_date";
//     }
//
//     @JsonProperty('date_fin')
//     getdate_fin(){
//         return "end_date";
//     }
// }
//
