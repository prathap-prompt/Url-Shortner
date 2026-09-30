import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { user } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Register } from './Dtos/register.dto';
import { Upadtedto } from './Dtos/update.dto';




@Injectable()
export class UsersService {
    constructor(
            @InjectRepository(user)
            private readonly userRepo:Repository<user>,

    ){}
     async Register(dto:Register){
        const existing=await this.userRepo.findOne({where:{email:dto.email}});
        if(existing){
            throw new ConflictException ('eamil alreday exists')
        }
        const user=this.userRepo.create({
            name:dto.name,
            email:dto.email,
            password:dto.password,
        })

        return this.userRepo.save(user);
    }
    
    async findone(id:string){
        const user=await this.userRepo.findOne({where:{id}});
        if(!user){
            throw new BadRequestException("user not found")
        }
        return user
    }

    async findAll(){
        return await this.userRepo.find()
    }

    async upadteuser(id:string,dto:Upadtedto){
        const user=await this.userRepo.findOne({where:{id}});
        if(!user){
            throw new NotFoundException("user not found")
        }
        this.userRepo.merge(user,dto)

        return this.userRepo.save(user)
    }

    async remove(id:string){
        const user= await this.userRepo.findOne({where:{id}});
        if(!user){
            throw new NotFoundException("user not found")
        }

        await this.userRepo.delete(id)

        return({
            message:"user is deleted suscessfully"
        })
    }

    
        
}


