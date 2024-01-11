import { Injectable } from '@nestjs/common';
import { CreateUsersDto } from './dto/create-users.dto';
import { RolesService } from 'src/roles/roles.service';
import { randomUUID } from 'crypto';

export type User =any;

@Injectable()
export class UsersService {

    constructor(private readonly rolesService:RolesService){}

    //user data storage 
    private users = new Map<string,any>()

    async createUser(createUsersDto:CreateUsersDto){
        const userId=randomUUID();

        const user={
            id:userId,
            username:createUsersDto.name,
            password:createUsersDto.password,
            best_friend:createUsersDto.best_friend,
        };
        this.users.set(userId,user);

        //roles 
        const defaultRole='user';
        this.rolesService.assignRoles(userId,[defaultRole])


        return {id:userId,username:user.username}


    }

    async findOne(id:string): Promise<User | undefined>{
        return this.users.get(id);
    }
    
}
