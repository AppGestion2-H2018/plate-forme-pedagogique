import {ImageLinks} from "./imageLinks";
import {Author} from "./author";
// Définition de la class
export class VolumeInfo {

    id: string;
    title: string;
    subtitle: string;
    authors: Author[];
    publishedDate: string;
    pageCount: number;
    language: string;
    previewLink: string;
    infoLink: string;
    imageLinks: ImageLinks;
}