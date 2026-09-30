import { Controller, Get,Body,Post, Param, Patch, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { Register } from './Dtos/register.dto';
import { Upadtedto } from './Dtos/update.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly userservice: UsersService) {}
   
    @Post()
    register(@Body() dto: Register) {
        return this.userservice.Register(dto);
    }


    @Get(':id')
    findone(@Param('id') id: string) {
        return this.userservice.findone(id);
    }

    @Get()
     findAll(){
        return this.userservice.findAll()
    }

    @Patch(':id')
    updateuser(@Param('id') id:string,@Body() dto:Upadtedto){
        return this.userservice.upadteuser(id,dto);
    }

    @Delete(':id')
    removeuser(@Param('id') id:string){
        return this.userservice.remove(id)
    }
}

