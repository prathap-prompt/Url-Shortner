import { IsInt, IsOptional, IsString } from "class-validator";


export class DataRangeDto{

    @IsOptional()
    @IsString()
    startDate?:string;

    @IsOptional()
    @IsInt()
    endDate?:string;
}