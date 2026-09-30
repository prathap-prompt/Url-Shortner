import { isEmail, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class Register {

    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsEmail()
    email!:string;

    @IsNotEmpty()
    password!:string;


}

