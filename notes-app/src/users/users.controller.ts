import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { CreateUsersDto } from './dto/create-users.dto';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
import { UpdateUsersDto } from './dto/update-users.dto';
import { LoginUserDto } from './dto/login-users.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}

@Post('register')
register(@Body() createUsersDt:CreateUsersDto):Promise<User>{
    return this.usersService.register(createUsersDt);
}

@Post('login')
login(@Body() loginUserDto:LoginUserDto):Promise<User>{
    return this.usersService.login(loginUserDto)
}

// @UseGuards(JwtAuthGuard)
@Get('profile/:id')
profile(@Param('id') id:string):Promise<User>{
    return this.usersService.profile(id);
}

// @UseGuards(JwtAuthGuard)
@Patch('update/:id')
updateProfile(@Param('id') id: string, @Body() updateUserDto: UpdateUsersDto): Promise<User> {
  return this.usersService.updateProfile(id, updateUserDto);
}

// @UseGuards(JwtAuthGuard)
@Delete('delete/:id')
deleteAccount(@Param('id') id:string):Promise<User>{
    return this.usersService.deleteAccount(id);
}

//Admin route to get all users
// @UseGuards(JWtAuthGuard,RolesGuard)
// @Roles('admin')
@Get('all')
getAllUsers():Promise<User[]>{
    return this.usersService.findAll();
}

}


