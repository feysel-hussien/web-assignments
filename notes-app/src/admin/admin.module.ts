import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { NotesModule } from 'src/notes/notes.module';

@Module({
  imports:[
    NotesModule
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
