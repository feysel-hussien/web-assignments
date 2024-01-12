import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { UUID } from "mongodb";

export class CreateUsersDto {

    userId:UUID;
    
    @IsNotEmpty()
    name:string;

    @IsNotEmpty()
    @MinLength(6)
    password:string;

    @IsNotEmpty()
    best_friend:string;

    @IsNotEmpty()
    @IsEmail()
    email:string;

}
