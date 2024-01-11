import { Injectable } from '@nestjs/common';
import { MongoClient } from 'mongodb';

@Injectable()
export class NotesService {
    private readonly uri:string;
    private readonly dbName:string='';
    private readonly collections:string='notes';

    constructor(){
        //Mondodb connection string
        this.uri=''
    }

    private async getClient(){
        const client= new MongoClient(this.uri,{ useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        return client;
    }

    async create(createNoteDto: any,userId:string){
        const note ={
            title:createNoteDto.title,
            content:createNoteDto,
            userId:userId,
            createdAt:new Date(),
            updatedAt:new Date(),
        };

        const client = await this.getClient();
        const result = await client.db(this.dbName).collection(this.collectionName).insertOne(note);

        client.close();
        return result.ops[0];

    }

    async remove(id:string, userId:string){
        const client = await this.getClient();

    }


    async findById(id:string,userId:string){

    }

    async findAll(userId:string){
        
    }
}
