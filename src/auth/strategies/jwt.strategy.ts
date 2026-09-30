import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { userRole } from '../../users/enums/user.enum';

@Injectable()
export class jwtstrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
              jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
       });
    }

    async validate(payload:{sub:string,email:string,role:userRole}){
        return({
            userId:payload.sub,
            email:payload.email,
            role:payload.role
        })
    }
}