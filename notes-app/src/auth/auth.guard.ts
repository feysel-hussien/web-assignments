import { CanActivate, ExecutionContext,
Injectable,UnauthorizedException, } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Request } from 'express';
import { JwtService } from "@nestjs/jwt";
import { jwtConstants } from "./constants";
import { UsersService } from "src/users/users.service";

@Injectable()
export class JwtAuthGuard implements CanActivate{
    constructor(private readonly authService:AuthService,
        private jwtService:JwtService,
        private usersService: UsersService){}

    async canActivate(context: ExecutionContext):Promise<boolean>{
            const request = context.switchToHttp().getRequest();
            // console.log(request);
            const token = request.headers.authorization.split(" ")[1];
            // const token = request.cookies['jwt'];
            console.log(token);

            if (!token) {
                console.log("token not found")
                throw new UnauthorizedException();
            }
            try{
                const payload = await this.jwtService.verifyAsync(token);
                const user = await this.usersService.findOne(payload.id);
                if (!user){
                    console.log("user not found")
                    throw new UnauthorizedException();

                }
                request.user = user;
                // console.log(request.user)
                return true;
                

                return true;

            }
            catch(e){
                throw new UnauthorizedException();
            }
        
    }

    private extracTokenFromHeader(request:Request):string|undefined{
        const [type,token] = request.headers.authorization?.split(' ')?? [];
        return type ==='Bearer' ? token :undefined;
    }

}