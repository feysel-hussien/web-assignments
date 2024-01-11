import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Document } from "mongoose";


// export type noteDocument =HydratedDocument<note>;

@Schema()
export class Note{
    @Prop()
    title:string

    @Prop()
    content:string;

    @Prop()
    userId:string;

    //Time stamps
    @Prop({default:Date.now})
    createdAt:Date;

    @Prop({default:Date.now})
    updatedAt:Date;
    
}
export type NoteDocument = Note & Document;
export const NoteSchema =SchemaFactory.createForClass(Note);

