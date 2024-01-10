import { Injectable } from '@nestjs/common';

export type User =any;

@Injectable()
export class UsersService {
    private readonly users=[
        {
            userId:1,
            username:'nahom',
            password:'123'
        },
        {
            userId:2,
            username:'mikiyas',
            password:'123'
        },
        {
            userId:3,
            username:'lemi',
            password:'123'
        },

    ];
    async findOne(username:string): Promise<User | undefined>{
        return this.users.find(user=> user.username ===username);
    }
}
