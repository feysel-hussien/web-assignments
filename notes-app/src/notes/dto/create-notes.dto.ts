import { UUID } from "mongodb";

export class CreateNotesDto {
    title:string;
    content:string;
    notesId:UUID;
}
