import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthMiddleware implements NestMiddleware{
    constructor(private usersService:UsersService){}

    async use(req:any,res:any,next:()=>void){
        const userId = req.headers['user-id'];
        const user = await this.usersService.findOne(userId); // fetch user data
        if (!user) {
            throw new UnauthorizedException();
        }
        req.user = user; // set the entire user object, including roles
        next();
    }
}