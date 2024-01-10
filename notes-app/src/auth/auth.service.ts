import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private UsersService: UsersService){}
    async signIn(username:string,pass:string):Promise<any>{
        const user = await this.UsersService.findOne(username);
        if (user?.password !==pass){
            throw new UnauthorizedException();
        }
        const {password, ...result}=user;

        return result;
    }
}
