import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { NotesService } from 'src/notes/notes.service';

@Injectable()
export class AdminService {

  constructor(private readonly notesService: NotesService){}

  getAllUsers(){}

  getAllNotes(){}

  getNoteById(){}

  deleteNote(){}

  deleteUser(){}
}
