import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNotesDto } from './dto/create-notes.dto';
import { UpdateNotesDto } from './dto/update-notes.dto';

@Controller('notes')
export class NotesController {
    constructor(private readonly notesService:NotesService){}

    //create notes by users

    // @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() createNoteDto: CreateNotesDto,@Req() req:any){
        return this.notesService.create(createNoteDto,req.userId);
    }
//Delete notes By Id
    // @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string, @Req() req:any){
        return this.notesService.remove(id, req.userId);
    }

    //findnotes get
    // @UseGuards(JwtAuthGuard)
    @Get(':id')
    findById(@Param('id') id:string, @Req() req:any){
        return this.notesService.findById(id,req.userId)
    }

    //find all notes from my data base
    // @UseGuards(JwtAuthGuard)
    @Get()
    findAll(@Req() req:any){
        return this.notesService.findAll(req.userId);
    }

//editing notes 
    // @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(@Body() updateNoteDto:UpdateNotesDto, @Param('id') id:string, @Req() req: any){
        return this.notesService.update(id, updateNoteDto, req.userId);
    }

}
