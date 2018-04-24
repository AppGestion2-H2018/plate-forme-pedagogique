// import {JsonObject, JsonProperty} from "json2typescript";
//
export class Event {

    id: string;
    text: string;
    // @JsonProperty('description')
    description: string;
    categorie: string;
    // @JsonProperty('date_debut')
    start_date: string;
    // @JsonProperty('date_fin')
    end_date: string;
    type: string;
    creation_date: string;
    admin_id:string;
    group_id: string;
    active: boolean;
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
