import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Throttle } from '@nestjs/throttler';
import { ApiTags,ApiOperation,ApiResponse } from '@nestjs/swagger';


@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authservice:AuthService
    ){}

    @ApiOperation({summary:'registering user'})
    @Post('register')
    @Throttle({
        default:{
            limit:5,
            ttl:60000,
        }
    })
    async register(@Body() dto:RegisterDto){
        return this.authservice.register(dto)
    }
    
    @ApiOperation({summary:'login user and generate JWT token'})
    @Post('login')
    async login(@Body() dto:LoginDto){
        return this.authservice.login(dto)
    }
}
