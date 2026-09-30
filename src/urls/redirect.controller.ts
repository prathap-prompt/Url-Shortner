import { Controller, Get, Param,Res,Req } from "@nestjs/common";
import { UrlsService } from "./urls.service";
import  type{ Response ,Request} from "express";

@Controller()
export class  redirect{

    constructor(
        private readonly urlservice:UrlsService
    ){}


    @Get(":shortcode")
    async redirect(@Param('shortcode') shortcode:string,@Req() req:Request,@Res() res:Response){
        return await this.urlservice.redirect(shortcode,res,req)
    }
}