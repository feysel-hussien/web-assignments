import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Note,NoteDocument } from 'src/notes/schemas/note.schema';
import { UsersService } from 'src/users/users.service';


@Injectable()
export class AdminService {

  constructor(@InjectModel(Note.name) private readonly noteModel: Model<NoteDocument>,
  private readonly usersService: UsersService,
  ){}

  async getAllUsersWithNotes():Promise<Map<string,Note[]>>{

    const allUsers = await this.usersService.findAll();
    const result = new Map <string,Note[]>();

    for (const user of allUsers){
      const userNotes = await this.noteModel.find({userId:user._id}).exec();

      result.set(user._id.toString(),userNotes);
    }
    return result;
  }

//   getAllNotes(){
//     return this.notesService.findAll('id');
//   }

//   getNoteById(){
//     return this.notesService.findById()
//   }

//   deleteNote(noteId:string){
//     return this.notesService.remove('noteId','id')
//   }

//   deleteUser(userId:string){}
// }
}