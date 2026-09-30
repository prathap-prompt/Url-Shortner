import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Url } from './entities/url.entity';
import { user } from '../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Create_urldto } from './dto/create_url.dto';
import { randomBytes } from 'node:crypto';
import { UpdateUrlDto } from './dto/update_url.dto';
import { Response,Request } from 'express';
import { AnalyticsService } from 'src/analytics/analytics.service';



@Injectable()
export class UrlsService {
    constructor(@InjectRepository(Url)
                private readonly urlRepo:Repository<Url>,

                @InjectRepository(user)
                private readonly userRepo:Repository<user>,

                private readonly analyticsservice:AnalyticsService
    ){}

    async create(userId:string,dto:Create_urldto){
        const user=await this.userRepo.findOne({where:{id:userId}})

        if(!user){
            throw new NotFoundException("user not found")
        }
        let shortcode: string
        if(dto.customUrl){
            const existing=await this.urlRepo.findOne({where:{shorturl:dto.customUrl}})

            if(existing){
                throw new ConflictException("This URL already tkaen")
            }
            shortcode=dto.customUrl;
        }else{
            shortcode=await this.genarationuniquecode()
        }
        
        const url=this.urlRepo.create({
            originalurl:dto.originalUrl,
            shorturl:shortcode,
            expiresAt:dto.expiresAt? new Date(dto.expiresAt):null,
            user:user,
         })

         return this.urlRepo.save(url)
    }

    private async genarationuniquecode():Promise<string>{
        let shortcode:string
        let exists=true
        let attempts=0
        let maxattempts=3

        while(exists&&attempts<maxattempts){
            shortcode= randomBytes(6).toString('base64url');

            const existingUrl= await this.urlRepo.findOne({where:{shorturl:shortcode}});
         if(!existingUrl){
            exists=false
          }
        }
        return shortcode!
    }

    async finone(userId:string,id:string){
        const url=await this.urlRepo.findOne({where:{
            id,
            user:{id:userId}
        }})

        if(!url){
            throw new NotFoundException("URL not found")
        }

        return url;
    }

    async update(id:string,userId:string,dto:UpdateUrlDto){
        const url = await this.urlRepo.findOne({
            where: {
                id,
                user: { id: userId },
            },
        });

        if (!url) {
            throw new NotFoundException('URL not found');
        }

        this.urlRepo.merge(url, { originalurl: dto.originalUrl })
        return this.urlRepo.save(url)
    }

    async findall(userId:string){
        const urls=await this.urlRepo.find({where:{user:{id:userId}}});

        if(!urls){
            throw new NotFoundException("urls are not found")
        }

        return urls
    }

    async remove(userId:string,id:string){
        const url=await this.urlRepo.findOne({where:
            {id,
            user:{id:userId}}
        });

        if(!url){
            throw new NotFoundException('url not found')
        }

        this.urlRepo.softRemove(url)
         return{
            message:"url is deleted sucessfully"
         }
    }

    async redirect(shortcode:string,res:Response,req:Request){
        const url=await this.urlRepo.findOne({where:{shorturl:shortcode}});

        if(!url){
            throw new NotFoundException("URL not found")
        }
        if(url.expiresAt && url.expiresAt<new Date()){
            throw new NotFoundException("The URL is Expired")
        }
        if(!url.isActive){
            throw new BadRequestException("URL is curenntly diasble")
        }

        const ipaddress=req.ip;
        const referrer=req.get("referrer");
        const userAgent=req.get("userAgent")
        const country=req.get("country")

        await this.analyticsservice.trackclicks(url,ipaddress,referrer,userAgent,country)
         
        

       await this.urlRepo.increment(
        {id:url.id},
        'clickcount',
        1
       )
       

    return res.redirect(url.originalurl)
    }

    async getanalytics(id:string,userId:string){
        const url= await this.urlRepo.findOne({where:{
            id,
            user:{id:userId}
        }})

        if(!url){
            throw new NotFoundException("URL not found")
        }

        return{
            urlId:url.id,
            orginalurl:url.originalurl,
            shortCode:url.shorturl,
            clikCount:url.clickcount

        }
    }

    async restore(id:string,userId:string){
        const url=await this.urlRepo.findOne({where:{id,
            user:{id:userId}},
        withDeleted:true}) // using with deleted it gets the active + deleted urls 

        if(!url){
            throw new NotFoundException("URL not found")
        }
        if(!url.deletedAt){
            throw new BadRequestException("URL is already in active")
        }
        url.deletedAt=null;

        await this.urlRepo.save(url)

        return{ message:"URL is restored"}
    }
    
    

}
