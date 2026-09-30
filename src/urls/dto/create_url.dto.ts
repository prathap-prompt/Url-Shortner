import { IsDateString, IsNotEmpty, IsOptional, IsString, IsUrl, MaxLength, MinLength } from "class-validator";
import { ApiProperty,ApiPropertyOptional } from "@nestjs/swagger";
export class Create_urldto{
    @IsUrl()
    @IsNotEmpty()
    @ApiProperty({example:'http:/youtube.com/video?name=slaypoint',
        description:"the url format must be correct format"
    })
    originalUrl!:string

    @IsOptional()
    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @ApiPropertyOptional({example:'my_custom_url',
        description:'optional custom url  '
    })
    customUrl?:string

    @IsOptional()
    @IsDateString()
    @ApiPropertyOptional({example:'26-09-2026',
        description:'optional expiry date for the url'
    })
    expiresAt?:string
}