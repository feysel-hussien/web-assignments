import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Note,NoteDocument } from 'src/notes/schemas/note.schema';
import { UserDocument } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';


@Injectable()
export class AdminService {

  constructor(@InjectModel(Note.name) private readonly noteModel: Model<NoteDocument>,
  private readonly usersService: UsersService, 
  private readonly userModel:Model<UserDocument>,
  ){}

  async getAllUsersWithNotes():Promise<{ [userId: string]: Note[] }>{

    const allUsers = await this.usersService.findAll();
    // console.log(allUsers)
    const result: { [userId: string]: Note[] } = {}

    for (const user of allUsers){
      const userId=user._id.toString();
      const userNotes = await this.noteModel.find({userId}).exec();
      // console.log(userNotes)
      result[userId]=userNotes;
    }
    // console.log(result)
    return result;
  }


//   deleteNote(noteId:string){
//     return this.notesService.remove('noteId','id')
//   }

  async deleteUserAndNotes(userId:string):Promise<void>{
    const user = await this.userModel.findById(userId);
    if (!user){
      throw new NotFoundException("User not found");
    }

    const userNotes = await this.noteModel.find({userId}).exec();

    for (const note of userNotes){
      await this.noteModel.findByIdAndDelete(note._id).exec();
    }

    //delete user
    await this.userModel.findByIdAndDelete(userId);
    console.log("successfully delted user and user data")
  }
}
