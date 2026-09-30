import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Urlclick } from './entities/url_click.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Url } from 'src/urls/entities/url.entity';




@Injectable()
export class AnalyticsService {
    constructor(@InjectRepository(Urlclick)
                private readonly urlclickRepo:Repository<Urlclick>,

                @InjectRepository(Url)
                private readonly urlRepo:Repository<Url>){}
    

     async trackclicks(url:Url,
        ipaddress?:string,
        userAgent?:string,
        referrer?:string,
        country?:string

     ){
      const analytics = this.urlclickRepo.create({
        url,
        ipaddress:ipaddress ?? null,
        userAgent:userAgent ?? null,
        referrer:referrer ?? null,
        clickedAt:new Date(),
        country:country ?? null
      });
      return this.urlclickRepo.save(analytics);
    }

    async getanalytics(userId:string,urlId:string,page:number,limit:number){

        const url=await this.urlRepo.findOne({where:{id:urlId,user:{id:userId}}})

        if(!url){
            throw new NotFoundException("URL not found")
        
        }

        const skip=(page-1)*10;

        const [clicks,total]=await this.urlclickRepo.findAndCount({where:{url:{id:urlId}},
            order:{clickedAt:"DESC"},
            skip,
            take:limit
        });

        return{
            urlId:url.id,
            shorturl:url.shorturl,
            total,
            page,
            limit,
            totalpages:Math.ceil(total/limit),
            clicks
        }

    }

    async getdailyanalytics(urlId:string,userId:string,startDate?:string,endDate?:string){
        const url =await this.urlRepo.findOne({where:{id:urlId,user:{id:userId}}})

        if(!url){
            throw new NotFoundException("URL not found")
        }

        if(startDate&&endDate&&
            new Date(startDate) > new Date(endDate)

        ){
            throw new BadRequestException("start cannot be greater then then enddate")
        }

        const query=this.urlclickRepo
            .createQueryBuilder('click')
            .select('DATE(click.clickedAt)', 'date')
            .addSelect('COUNT(click.id)', 'clicks')
            .where('click.url_id = :urlId', { urlId })

            if(startDate){
                query.andWhere(
                    'click.clickedAt >= :startDate',
                    {startDate},
                );}
            if(endDate){
                query.andWhere(
                    'click.clickedAt <= :endDate',
                    {endDate},
                );
            }
            
                    

        const dailyclicks=await query
        .groupBy('DATE(click.clickedAt)')
        .orderBy('DATE(click.clickedAt)', 'ASC')
        .getRawMany();
    

     return{
        urlId:url.id,
        shortcode:url.shorturl,
        dailyclicks

      }
    }

    async getbyreferrer(urlId:string,userId:string){
        const url=await this.urlRepo.findOne({where:{id:urlId,user:{id:userId}}});

        if(!url){
            throw new NotFoundException("URL Not found")
        }

        const referrers=await this.urlclickRepo
        .createQueryBuilder('click')
        .select('click.referrer','referrer')
        .addSelect('COUNT(click.id)','clicks')
        .where('click.url_id = :urlId', { urlId })
        .groupBy('click.referrer')
        .orderBy('COUNT(click.id)', 'DESC')
        .getRawMany();

        return{
            urlId:url.id,
            shorturl:url.shorturl,
            referrers,
        }

    }

    async getannalyticssummary(urlId:string,userId:string){
        const url=await this.urlRepo.findOne({where:{id:urlId,user:{id:userId}}});

        if(!url){
            throw new NotFoundException("URL Not Found")
        }

        const[totalclicks,dailyclicks,referrer]=await Promise.all([
             this.urlclickRepo.count({
            where:{url:{id:urlId}}
        }),
          
        this.urlclickRepo
        .createQueryBuilder('clicks')
        .select('DATE(clicks.clickedAt)','date')
        .addSelect('COUNT(click.id)','clicks')
        .where('click.url_id=:urlId',{urlId})
        .groupBy('DATE(clicks.clickedAt)')
        .orderBy('DATE(clicks.clickedAt)','ASC')
        .getRawMany(),
        
        this.urlclickRepo
        .createQueryBuilder('clicks')
        .select('clicks.referrer','referrer')
        .addSelect('COUNT(clicks.id)','clicks')
        .where('click.url_id=:urlId',{urlId})
        .groupBy('clicks.referrer')
        .orderBy('clicks.referrer','DESC')
        .getRawMany()
      ])


        return{
            urlId:url.id,
            shorturl:url.shorturl,
            totalclicks,
            dailyclicks,
            referrer,
        }
    }

    async gettopcounries(urlId:string,userId:string){
        const url=await this.urlRepo.findOne({where:{id:urlId,user:{id:userId}}});

        if(!url){
            throw new NotFoundException("URL not found")
        }

        const countries=this.urlclickRepo
        .createQueryBuilder('clicks')
        .select('clicks.country','country')
        .addSelect('COUNT(clicks.id)','clicks')
        .where('clicks.url_id=:urlId',{urlId})
        .groupBy('clicks.country')
        .addOrderBy('COUNT(clicks.id)','ASC')
        .getRawMany()



        return{
            urlId:url.id,
            shorturl:url.shorturl,
            countries
        }

    }

   
}
  

        

