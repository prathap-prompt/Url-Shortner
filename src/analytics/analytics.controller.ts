import { Controller, UseGuards,Get,Param, Query } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { jwtAuthguard } from 'src/auth/guards/jwt.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { PaginationDto } from './dtos/paginaton.dto';
import { DataRangeDto } from './dtos/data_range.dto';
import { ApiTags,ApiOperation,ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('analytics')
@Controller('analytics')
export class AnalyticsController {
    constructor(
        private readonly analyticsservice:AnalyticsService
    ){}


    @Get(":url_id")
    @UseGuards(jwtAuthguard)
    async getanalytics(@Param("url_id") url_id:string,
    @CurrentUser() user,
    @Query() query:PaginationDto,
   ){
        const page = query.page ?? 1;
        const limit = query.limit ?? 10;

        return await this.analyticsservice.getanalytics(url_id, user.userid,
            page,
            limit
        )
    }

    @Get(":url_id/daily")
    @UseGuards(jwtAuthguard)
    async getdailyclicks(@Param('url_id') url_id:string,@CurrentUser() user,
   @Query() query:DataRangeDto){
        return await this.analyticsservice.getdailyanalytics(url_id,user.userId,
    query.startDate,
    query.startDate
        )
    }

    @Get(':urlId/referrer')
    @UseGuards(jwtAuthguard)
    async getbyreferrer(@Param('urlId') urlId:string,@CurrentUser() user){
        return this.analyticsservice.getbyreferrer(urlId,user.userId)
    }

    @Get(":urlId/summary")
    @UseGuards(jwtAuthguard)
    async gettotalsummary(@Param('urlId') urlId:string,@CurrentUser() user){
        return await this.analyticsservice.getannalyticssummary(urlId,user.userId)
    }

    @Get(':urlId/country')
    @UseGuards(jwtAuthguard)
    async getbycountry(@Param('urlId') urlId:string,@CurrentUser() user){
        return this.analyticsservice.gettopcounries(urlId,user.userId)
    }
    
}
