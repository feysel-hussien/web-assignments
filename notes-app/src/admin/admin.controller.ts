import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { UpdateNotesDto } from 'src/notes/dto/update-notes.dto';
import { Role } from 'src/roles/role.enum';
import { Roles } from 'src/roles/roles.decorator';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/roles/roles.guard';

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

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Get('allwithnotes')
  getAllUsers() {
    return this.adminService.getAllUsersWithNotes();
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Delete('note/:id')
  deleteNote(@Param('id') id: string) {
    return this.adminService.deleteNote(id);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Delete('user/:id')
  deleteUser(@Param('id') id: string) {
    return this.adminService.deleteUserAndNotes(id);
  }
}
