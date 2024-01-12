import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class CreateUsersDto {

    
    @IsNotEmpty()
    name:string;

    @IsNotEmpty()
    @MinLength(6)
    password:string;

    best_friend:string;

    @IsNotEmpty()
    @IsEmail()
    email:string;

}
