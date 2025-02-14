import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AirQualityController } from './air-quality.controller';
import { AirQualityService } from './air-quality.service';
import { AirQuality, AirQualitySchema } from './schemas/air-quality.schema';
import { MulterModule } from '@nestjs/platform-express';
import { FILE_UPLOAD_PATH, LIMIT_FILE_SIZE } from '@helpers/constants';
import { AirQualityUploadService } from '@air-quality/air-quality-upload.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AirQuality.name, schema: AirQualitySchema },
    ]),
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: FILE_UPLOAD_PATH,
        limits: { fileSize: LIMIT_FILE_SIZE },
      }),
    }),
  ],
  controllers: [AirQualityController],
  providers: [AirQualityService, AirQualityUploadService],
  exports: [AirQualityService],
})
export class AirQualityModule {}
