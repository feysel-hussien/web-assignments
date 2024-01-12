import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class User{
    @Prop({required:true})
    name:string;

    @Prop({required:true})
    password:string;

    @Prop({ default: Date.now })
    createdAt: Date;
  
    @Prop({ default: Date.now })
    updatedAt: Date;

    @Prop({required:true,unique:true})
    email:string;

    @Prop({required:true})
    best_friend:string;

}

export type UserDocument = User & Document;

export const UserSchema =SchemaFactory.createForClass(User)
