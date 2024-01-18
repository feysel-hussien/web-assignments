import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "./role.enum";


@Injectable()
export class RolesGuard implements CanActivate{
    constructor (private reflector:Reflector){}


    canActivate(context: ExecutionContext): boolean{
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles',[
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requiredRoles){
            return true;
        }

       const request = context.switchToHttp().getRequest();
       const user = request.user;
    //    console.log(request.headers);
    //    const user = response.locals.user;
        // console.log("inside roles guard ")

    //     console.log(user,requiredRoles,response.locals.jwt)
    //     return requiredRoles.includes(user?.role);

    // const { user } = context.switchToHttp().getRequest();
    // console.log(user,requiredRoles)
    if (!user){
        return false;
    }    return requiredRoles.includes(user.role);
  }
    }
