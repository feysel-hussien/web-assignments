import { CanActivate, ExecutionContext } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";

export class JwtAuthGuard implements CanActivate{
    constructor(private readonly authService:AuthService){}
    canActivate(
        context: ExecutionContext):
         boolean | Promise<boolean> | Observable<boolean> {
            const request = context.switchToHttp().getRequest();
            return this.authService.validateToken(request);
        
    }
}