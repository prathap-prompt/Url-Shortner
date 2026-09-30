import { Controller, Post, UseGuards,Body,Param,Get, ParseIntPipe, Patch, Delete, Res } from '@nestjs/common';
import { UrlsService } from './urls.service';
import { Create_urldto } from './dto/create_url.dto';
import { jwtAuthguard } from '../auth/guards/jwt.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { ApiTags,ApiOperation,ApiBearerAuth } from '@nestjs/swagger';
import { UpdateUrlDto } from './dto/update_url.dto';


@ApiBearerAuth()
@ApiTags('urls')
@Controller('urls')
export class UrlsController {
  constructor(private readonly urlservice: UrlsService) {}
  
  @ApiOperation({summary:'creating the new shorturl'})
  @Post()
  @UseGuards(jwtAuthguard)
  async create(@Body() createurldto: Create_urldto, @CurrentUser() user) {
    return await this.urlservice.create(user.userId, createurldto);
  }
  
  @ApiOperation({summary:'getting the  particular url'})
  @Get(':id')
  @UseGuards(jwtAuthguard)
  async findone(@Param('id') id:string, @CurrentUser() user) {
   
    return await this.urlservice.finone(user.userId, id);
  }
  
  @ApiOperation({summary:'upadting the required url'})
  @Patch(':id')
  @UseGuards(jwtAuthguard)
  async update(@Param('id', ParseIntPipe) id: string, @CurrentUser() user, @Body() dto: UpdateUrlDto) {
    return await this.urlservice.update(user.userId, id, dto);
  }

  
  @ApiOperation({summary:'getting all urls of the user'})
  @Get()
  @UseGuards(jwtAuthguard)
  async findall(@CurrentUser() user) {
    return await this.urlservice.findall(user.userId);
  }

  @ApiOperation({summary:'getting the url analysis'})
  @Get(":id/analytics")
  @UseGuards(jwtAuthguard)
  async getanalytics(@Param("id") id:string,@CurrentUser() user){

    return await this.urlservice.getanalytics(id,user.userId)
  }
  
  @ApiOperation({summary:'deleting the required url'})
  @Delete(':id')
  @UseGuards(jwtAuthguard)
  async remove(@Param('id') id:string, @CurrentUser() user) {
    return await this.urlservice.remove(user.userId, id);
  }

  @ApiOperation({summary:'retoring the deleted url'})
  @Patch(":id/restore")
  @UseGuards(jwtAuthguard)
  async restore(@Param("id") id:string,@CurrentUser() user){
    return await this.urlservice.restore(id,user.userId)
  }

}