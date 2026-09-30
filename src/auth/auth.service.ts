import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { user } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(user)
        private readonly userRepo:Repository<user>,

        private readonly jwtservice:JwtService
    ){}

    

    async register(dto:RegisterDto){
        const existing=await this.userRepo.findOne({where:{email:dto.email}});
        if(existing){
            throw new ConflictException('Email already exists')
        }
        const hashedpassword=await bcrypt.hash(dto.password,10);
        
        const user=this.userRepo.create({
            name:dto.name,
            email:dto.email,
            password:hashedpassword
        })

        const saveduser=await this.userRepo.save(user);

        return({
            id:saveduser.id,
            name:saveduser.name,
            email:saveduser.email,
            
        })
    }

    async login(dto:LoginDto){
        const user=await this.userRepo
                   .createQueryBuilder('user')
                   .addSelect('user.password')
                   .where('user.email=:email',{
                    email:dto.email
                   }).getOne();

        if(!user){
            throw new NotFoundException("user not found")
        }
        const passwordmatch=await bcrypt.compare(dto.password,user.password);
        if(!passwordmatch){
            throw new UnauthorizedException('invalid credentials')
        }

        const payload={
            sub:user.id,
            email:user.email,
            role:user.role,
        }

        return({
            access_token: this.jwtservice.sign(payload),
        })


    }

    



}
