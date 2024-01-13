import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import {  createMongooseOptions } from 'database.config';
import { AuthService } from 'src/auth/auth.service';



@Module({
  imports:[
    MongooseModule.forFeature([{name:User.name,schema:UserSchema}]),
    MongooseModule.forRootAsync({
      useFactory: createMongooseOptions,
    }),

  ],
  controllers: [UsersController],
  providers: [UsersService,AuthService],
  exports:[UsersService],
})
export class UsersModule {}
