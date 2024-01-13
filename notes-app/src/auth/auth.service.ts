import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private UsersService: UsersService,
        private jwtService:JwtService
        ){}

        async validateUser (email:string,password:string):Promise<User|null>{
            const user = await this.UsersService.findByEmail(email);
            if (!user){
           throw new BadRequestException('Incorrect email');
        }
        if (await bcrypt.compare(password,user.password)) {
            const {password, ...result}=user;
            return result;
        }

        return null;
        }
    }

