import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { RolesService } from 'src/roles/roles.service';
import { CreateUsersDto } from 'src/users/dto/create-users.dto';

@Controller('auth')
export class AuthController {
        constructor(private authService: AuthService){}

        // @HttpCode(HttpStatus.OK)
        // @Post('login')
        // signIn(@Body() signInDto: Record<string,any>){
        //     return this.authService.signIn(signInDto.username,signInDto.password);
        // }

}
