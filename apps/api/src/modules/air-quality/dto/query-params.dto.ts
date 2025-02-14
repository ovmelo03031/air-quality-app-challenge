import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  Max,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class PaginationQueryDto {
  @ApiProperty({ default: 0 })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Min(0)
  page: number = 0;

  @ApiProperty({ default: 30 })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(100)
  limit: number = 30;
}

export class DateRangeDto extends PaginationQueryDto {
  @ApiProperty()
  @IsDateString()
  startDate: string;

  @ApiProperty()
  @IsDateString()
  endDate: string;
}
export enum Parameter {
  CO = 'co',
  NMHC = 'nmhc',
  Benzene = 'benzene',
  NOx = 'nox',
  NO2 = 'no2',
}

export class ParameterQueryDto extends PaginationQueryDto {
  @ApiProperty({ required: true, enum: Parameter })
  @IsEnum(Parameter)
  parameter: Parameter;

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  startDate?: string;

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  endDate?: string;
}

export type ParameterQueryDtoWithoutPage = Omit<
  ParameterQueryDto,
  'page' | 'limit'
>;
