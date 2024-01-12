import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsersDto } from './dto/create-users.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { UpdateUsersDto } from './dto/update-users.dto';
import { LoginUserDto } from './dto/login-users.dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {

    // constructor(private readonly rolesService:RolesService){}
    constructor(@InjectModel(User.name) private readonly userModel:Model<UserDocument>){}

    async register(createUserDto:CreateUsersDto):Promise<User>{
        
        const existingUser = await this.userModel.findOne({email:createUserDto.email}).exec();
        if (existingUser){
            throw new ConflictException('Email already exists');
        }

        const createdUser = new this.userModel(createUserDto);
        return createdUser.save();

    }

    async login(loginUserDto:LoginUserDto): Promise<User>{
        const user = await this.userModel.findOne({ email: loginUserDto.email }).exec();
        if (!user){
           throw new BadRequestException('Incorrect email');
        }
        if (! await bcrypt.compare(loginUserDto.password,user.password)) {
            throw new BadRequestException('Incorrect password');
        }

        return user;
    
    }

    async findAll(): Promise<User[]>{
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
