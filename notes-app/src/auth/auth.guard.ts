import { CanActivate, ExecutionContext,
Injectable,UnauthorizedException, } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Request } from 'express';
import { JwtService } from "@nestjs/jwt";
import { jwtConstants } from "./constants";

@Injectable()
export class JwtAuthGuard implements CanActivate{
    constructor(private readonly authService:AuthService,
        private jwtService:JwtService){}

    async canActivate(context: ExecutionContext):Promise<boolean>{
            const request = context.switchToHttp().getRequest();
            const token = this.extracTokenFromHeader(request);
            if (!token) {
                throw new UnauthorizedException();
            }
            try{
                const payload = await this.jwtService.verifyAsync(
                    token,
                    {
                        secret:jwtConstants.secret
                    }
                );
                request['user']=payload;

            }
            catch{
                throw new UnauthorizedException();
            }
            return true;
        
    }

    private extracTokenFromHeader(request:Request):string|undefined{
        const [type,token] = request.headers.authorization?.split(' ')?? [];
        return type ==='Bearer' ? token :undefined;
    }

}