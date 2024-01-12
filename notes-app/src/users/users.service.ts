import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsersDto } from './dto/create-users.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { UpdateUsersDto } from './dto/update-users.dto';
import { LoginUserDto } from './dto/login-users.dto';


@Injectable()
export class UsersService {

    // constructor(private readonly rolesService:RolesService){}
    constructor(@InjectModel(User.name) private readonly userModel:Model<UserDocument>){}

    async register(createUserDto:CreateUsersDto):Promise<User>{
        const createdUser = new this.userModel(createUserDto);
        return createdUser.save();
    }

    // async createUser(createUsersDto:CreateUsersDto){
    //     const userId=randomUUID();

    //     const user={
    //         id:userId,
    //         username:createUsersDto.name,
    //         password:createUsersDto.password,
    //         best_friend:createUsersDto.best_friend,
    //     };
    //     this.users.set(userId,user);



    //     return {id:userId,username:user.username}


    // }
    async login(loginUserDTo:LoginUserDto): Promise<{accessToken:string}>{
        return;
    
    }

    async getAllUsers(): Promise<User[]>{
        return this.userModel.find().exec();
    }
    
    // async profile

    async profile(userId:string):Promise<User>{
        const user = await this.userModel.findById(userId).exec();

        if (!user){
            console.log("User Not found WE cant get the user");
            throw new NotFoundException("User Not found WE cant get the user");
        }
        return user;
    }


    //update profile 

    async updateProfile(userId:string,updateUserDto:UpdateUsersDto):Promise<User>{
        const updatedUser = await this.userModel
        .findOneAndUpdate({ _id:userId}, {$set: UpdateUsersDto},{new:true})
        .exec();

        if (!updatedUser){
            console.log("we cant update profile no such User in Database")
            throw new NotFoundException("User not found");
        }
        return updatedUser;
    }

    async deleteAccount(userId:string):Promise<User>{
        const deletedUser = await this.userModel.findOneAndDelete({
            _id:userId,
        }).exec();

        if (!deletedUser){
            throw new NotFoundException("Cant be delted user not found");
        }
        return deletedUser;
    }
}
