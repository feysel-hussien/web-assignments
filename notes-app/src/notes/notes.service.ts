import { Injectable, NotFoundException } from '@nestjs/common';
import { Note, NoteDocument } from './schemas/note.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateNotesDto } from './dto/create-notes.dto';
import { UpdateNotesDto } from './dto/update-notes.dto';

@Injectable()
export class NotesService {

    constructor(@InjectModel(Note.name) private readonly noteModel: Model<NoteDocument>){}

    async create(createNoteDto:CreateNotesDto,userId:string):Promise <Note>{

        const createdNote = new this.noteModel({...createNoteDto,userId});
        console.log('Note created successfully')
        return createdNote.save()

    }

    async remove(id:string, userId:string):Promise <Note>{
        const deletedNote = await this.noteModel.findOneAndDelete({
            _id:id,
            userId
        }).exec()
        if (!deletedNote){
            throw new NotFoundException('Note not found')
        }

        return deletedNote
    }


    async findById(id:string,userId:string):Promise <Note>{
        const note = await this.noteModel.findOne({
            _id:id,
            userId
        }).exec()
        if (!note){
            throw new NotFoundException('Note not found');
        }
        return note;

    }

    async findAll(userId:string):Promise <Note[]>{
        return this.noteModel.find({userId}).exec();

    }

    async findAllNotesForAdmin():Promise <Note[]>{
        return this.noteModel.find().exec();

    }

    async update(id:string,updateNoteDto:UpdateNotesDto,userId:string):Promise <Note>{
        const updatedNote = await this.noteModel
        .findOneAndUpdate(
            {_id:id,userId},{$set:updateNoteDto},{new:true}
        ).exec();

        if(!updatedNote){
            throw new NotFoundException('Note not found');
        }
        return updatedNote;

    }
}
