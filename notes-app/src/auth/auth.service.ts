import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';



@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<any>| null {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new BadRequestException('Incorrect email');
    }
    if (await bcrypt.compare(password, user.password)) {

      return user;
    }
    throw new BadRequestException('Incorrect password');
  }
  async login(email:string,password:string){
    
    const user = await this.validateUser(email,password);

    if (user){
        const payload ={email:user.email,sub:user.userId};

        return {
            access_token:this.jwtService.signAsync(payload),
        }
    }
        else{
            throw new UnauthorizedException("Invalid creditionals")

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

