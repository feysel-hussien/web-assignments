import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { UpdateNotesDto } from 'src/notes/dto/update-notes.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}


  // @Get('notes')
  // getAllNotes() {
  //   return this.adminService.getAllNotes();
  // }


  // @Get('notes/:id')
  // getNoteById(@Param('id') id: string) {
  //   return this.adminService.getNoteById();
  // }


  // @Get('users')
  // getAllUsers() {
  //   return this.adminService.getAllUsers();
  // }

  // @Delete('note/:id')
  // deleteNote(@Param('id') id: string) {
  //   return this.adminService.deleteNote();
  // }

  // @Delete('user:id')
  // deleteUser(@Param('id') id: string) {
  //   return this.adminService.deleteUser();
  // }
}
