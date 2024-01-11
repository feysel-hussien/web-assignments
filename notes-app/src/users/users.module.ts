import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { RolesService } from 'src/roles/roles.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService,RolesService],
  exports:[UsersService],
})
export class UsersModule {}
