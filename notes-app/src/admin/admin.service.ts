import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { NotesService } from 'src/notes/notes.service';

@Injectable()
export class AdminService {

  constructor(private readonly notesService: NotesService){}

  getAllUsers(){}

  getAllNotes(){
    return this.notesService.findAll('id');
  }

  getNoteById(){
    return this.notesService.findById()
  }

  deleteNote(noteId:string){
    return this.notesService.remove('noteId','id')
  }

  deleteUser(userId:string){}
}
