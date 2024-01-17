import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { access } from 'fs';
import { Request,Response } from 'express';



@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<any>| null {
    const user = await this.usersService.findByEmail(email);
    try{
    if (!user) {
         throw new UnauthorizedException('Incorrect email');
    }
    else if (await bcrypt.compare(password, user.password)) {
      return user;
    }
     throw new UnauthorizedException('Incorrect password');
  }
  catch(error){
    throw error;

  }
}
  async login(email:string,password:string,request:Request,response:Response):Promise<any>{
    const user = await this.validateUser(email,password);

    try{
    if (user){
        const payload ={id:user._id};
        const access_token= await this.jwtService.signAsync(payload);

        // response.cookie('access_token', access_token, {
        //   httpOnly: true,
        //   secure: true,
        //   sameSite: 'strict', 
        // });
        return access_token;
    }
        else{
            throw  new UnauthorizedException("Invalid creditionals")

    }
  } catch(error){
    throw error;
  }
  
  
}

  async validateToken(request:any):Promise<boolean>{
    const bearerToken = request.headers.auhorization;
    if (!bearerToken){
      return false;
    }
    const token = bearerToken.replace('Bearer','');
    try{
      const decoded = this.jwtService.verify(token);
      request.user = decoded;
      return true;
    }
    catch (error){
      throw new UnauthorizedException("Invalid Token")
    }
  }
}

