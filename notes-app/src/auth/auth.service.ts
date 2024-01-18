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
    // console.log(user)
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
  async login(email:string,password:string):Promise<any>{
    const user = await this.validateUser(email,password);

    try{
    if (user){
      // console.log(`Checking creditials for user ${user}`);
        const payload ={id:user._id,role:user.role};
        // console.log(payload)
        const access_token= await this.jwtService.signAsync(payload);

        // response.cookie('access_token', access_token, {
        //   httpOnly: true,
        //   secure: true,
        //   sameSite: 'strict', 
        // });
        // console.log(`Finished checking creditials and returned an access token and user ${user}`)
        // console.log(access_token,user);
        return {jwt:access_token,user:user};
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

