export class Groupe {
  _id: String;
  nom: string;
  date_fin: Date;
  actif: Boolean;
  est_publique: Boolean;
  commenter: Boolean;
  super_admin: number;
  admin: number;
  programmes: number[];
  classes: number[];
  type: number[];
  utilisateur: number[];
  blacklist: number;
  
}