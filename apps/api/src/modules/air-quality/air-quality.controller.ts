import {
  BadRequestException,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AirQualityService } from './air-quality.service';
import {
  DateRangeDto,
  ParameterQueryDtoWithoutPage,
} from './dto/query-params.dto';
import { FILE_UPLOAD_PATH, LIMIT_FILE_SIZE } from '@helpers/constants';
import { diskStorage } from 'multer';
import { AirQualityUploadService } from '@air-quality/air-quality-upload.service';

@ApiTags('air-quality')
@Controller('air-quality')
export class AirQualityController {
  constructor(
    private readonly airQualityService: AirQualityService,
    private readonly airQualityUploadService: AirQualityUploadService,
  ) {}

  @Post('upload-data')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: FILE_UPLOAD_PATH,
        filename: (req, file, cb) => {
          const filename = `${Date.now()}-${file.originalname}`;
          cb(null, filename);
        },
      }),
      limits: { fileSize: LIMIT_FILE_SIZE },
    }),
  )
  @ApiOperation({ summary: 'Ingest CSV data' })
  async ingestData(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'text/csv',
        })
        .addMaxSizeValidator({
          maxSize: LIMIT_FILE_SIZE,
        })
        .build({
          fileIsRequired: true,
          errorHttpStatusCode: HttpStatus.BAD_REQUEST,
        }),
    )
    file: Express.Multer.File,
  ) {
    if (!file.originalname.toLowerCase().endsWith('.csv')) {
      throw new BadRequestException('Only CSV files are allowed');
    }
    return this.airQualityUploadService.ingestCsvData(file);
  }

  @Get('by-parameter')
  @ApiOperation({ summary: 'Get data for specific parameter' })
  async getParameterData(
    @Query()
    params: ParameterQueryDtoWithoutPage,
  ) {
    return this.airQualityService.getParameterData(params);
  }

  @Get()
  @ApiOperation({ summary: 'Get data within date range' })
  async getDataInDateRange(@Query() query: DateRangeDto) {
    return this.airQualityService.getDataInDateRange(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get dataset details and statistics' })
  async getDatasetById(@Param('id') id: string) {
    return this.airQualityService.getDatasetById(id);
  }
}
