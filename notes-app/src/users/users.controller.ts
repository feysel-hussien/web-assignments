import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUsersDto } from './dto/create-users.dto';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
import { UpdateUsersDto } from './dto/update-users.dto';
import { LoginUserDto } from './dto/login-users.dto';
import * as bcrypt from 'bcrypt';


@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}

@Post('register')
@UsePipes(new ValidationPipe({transform:true}))
async register(@Body() createUsersDto:CreateUsersDto):Promise<User>{
    const hashedPassword = await bcrypt.hash(createUsersDto.password,10);

    const userWithHashedPassword :CreateUsersDto={
        ...createUsersDto,
        password:hashedPassword,
    }

    return this.usersService.register(userWithHashedPassword);
}

@Post('login')
async login(@Body() loginUserDto:LoginUserDto):Promise<User>{
    return this.usersService.login(loginUserDto)
}

// @UseGuards(JwtAuthGuard)
@Get('profile/:id')
async profile(@Param('id') id:string):Promise<User>{
    return this.usersService.profile(id);
}

// @UseGuards(JwtAuthGuard)
@Patch('update/:id')
async updateProfile(@Param('id') id: string, @Body() updateUserDto: UpdateUsersDto): Promise<User> {
  return this.usersService.updateProfile(id, updateUserDto);
}

// @UseGuards(JwtAuthGuard)
@Delete('delete/:id')
async deleteAccount(@Param('id') id:string):Promise<User>{
    return this.usersService.deleteAccount(id);
}

//Admin route to get all users
// @UseGuards(JWtAuthGuard,RolesGuard)
// @Roles('admin')
@Get('all')
async getAllUsers():Promise<User[]>{
    return this.usersService.findAll();
}

}


