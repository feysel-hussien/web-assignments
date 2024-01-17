import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, Put, Req, Request, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUsersDto } from './dto/create-users.dto';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
import { UpdateUsersDto } from './dto/update-users.dto';
import { LoginUserDto } from './dto/login-users.dto';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { response } from 'express';


@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService,
        private readonly authService:AuthService){}


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
@UsePipes(new ValidationPipe({transform:true}))
async login(@Body() loginUserDto:LoginUserDto,@Req() request, @Res() response){
    const user= await this.authService.login(loginUserDto.email,loginUserDto.password,request,response);
    try{
        if(!user){
            throw new BadRequestException('Invalid credentials');
        }
        console.log(`found the user ${user}`)
        return user;
        // const token = user.access_token;
        // console.log(request.cookie['access_token']);
        // return {access_token:token};
    }
    catch(error){
        console.log(error);
        return error 
    }
}

@UseGuards(JwtAuthGuard)
@Get('profile/:id')
async profile(@Param('id') id:string):Promise<User>{
    return this.usersService.profile(id);
}

// @UseGuards(JwtAuthGuard)
@Patch('update/:id')
async updateProfile(@Param('id') id: string, @Body() updateUserDto: UpdateUsersDto): Promise<User> {
  return this.usersService.updateProfile(id, updateUserDto);
}

@UseGuards(JwtAuthGuard)
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


