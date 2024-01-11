import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateUsersDto } from './dto/create-users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}

//routes 
//Get /users  --> []
@Get()
getUsers(){
    return []
}
//Get /users/:id  --> {...}
@Get(':id')
getOneUser(@Param('id') id:string){
    const user =this.usersService.findOne(id);
    if (!user){
        throw new Error('User not find');
    }
    return {
        user
    }
}
//POST /users 
@Post('signup')
async createUser(@Body() createUsersDto: CreateUsersDto ){
    this.usersService.createUser(createUsersDto);

    return {
        name:createUsersDto.name,
        password:createUsersDto.password,
        best_friend:createUsersDto.best_friend,
    }
}
// PUT /users -->{ .... }

@Put(':id')
updateUser(@Param('id') id:string){
    return {}
}
//DELETE / users/:id
@Delete(':id')
removeUser(@Param('id') id:string){
    return {};
}
}
