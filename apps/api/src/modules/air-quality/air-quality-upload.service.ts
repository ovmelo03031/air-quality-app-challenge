import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AirQuality } from '@air-quality/schemas/air-quality.schema';
import { Model } from 'mongoose';
import { formatToDate } from '@helpers/dates.helpers';
import { createReadStream, promises as fsPromises } from 'fs';
import * as csvParser from 'csv-parser';
import { BATCH_SIZE } from '@helpers/constants';
import { VARIABLE_ASSOCIATION } from '@repo/shared-constants/src';
import { ValueOf } from '@models/interval-by-parameters';
import { Transform } from '@nestjs/common/interfaces';

@Injectable()
export class AirQualityUploadService {
  constructor(
    @InjectModel(AirQuality.name)
    private airQualityModel: Model<AirQuality>,
  ) {}
  private readonly logger: Logger = new Logger(AirQualityUploadService.name);

  async ingestCsvData(file: Express.Multer.File): Promise<void> {
    try {
      this.logger.log('Ingesting data from CSV file');
      this.validateCsvFile(file);
      await this.getBatchOfDataFromCSVFile(file.path);
    } finally {
      await this.removeFile(file.path);
    }
  }

  //#region CSV Parsing

  private validateCsvFile(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Should send a file');
    }

    if ('text/csv' !== file.mimetype) {
      throw new BadRequestException(
        'The file should be a CSV file with text/csv mimetype',
      );
    }
  }

  private parseCsvRow(row: { [key: string]: string }): AirQuality | null {
    const isEmpty = Object.values(row).every((value) => value.trim() === '');
    if (isEmpty) {
      return null;
    }

    const readingsData = Object.entries(row).filter(
      ([key, value]) => !['Date', 'Time'].includes(key) && value.trim() !== '',
    );

    const readings = this.parserReadingData(readingsData);

    return {
      timestamp: formatToDate(row['Date'], row['Time']),
      ...readings,
    } as AirQuality;
  }

  private parserReadingData(
    readingsData: [string, string][],
  ): Record<string, { value: number; columnName: string }> {
    const readings = {};
    for (const [columnName, value] of readingsData) {
      if (columnName in VARIABLE_ASSOCIATION) {
        const column = VARIABLE_ASSOCIATION[columnName] as ValueOf<
          typeof VARIABLE_ASSOCIATION
        >;
        readings[column] = parseFloat(value.replace(',', '.'));
      }
    }
    return readings;
  }

  private getBatchOfDataFromCSVFile(filePath: string): Promise<void> {
    const records: AirQuality[] = [];
    return new Promise((resolve, reject) => {
      const stream = createReadStream(filePath).pipe(
        csvParser({ separator: ';' }),
      );

      stream
        .on('data', (data) => {
          this.precessCsvStreamData(stream, data, records);
        })
        .on('end', () => {
          this.processEndOfStream(stream, records, resolve);
          this.logger.log('Data ingestion completed');
        })
        .on('error', (error) => {
          this.logger.error('Error parsing CSV file', error);
          reject(new BadRequestException('Error processing CSV file'));
        });
    });
  }

  private async precessCsvStreamData(
    stream: NodeJS.ReadableStream,
    data: unknown,
    records: AirQuality[],
  ): Promise<void> {
    stream.pause();
    try {
      const row = data as { [key: string]: string };

      const record = this.parseCsvRow(row);
      if (record) {
        records.push(record);

        if (records.length >= BATCH_SIZE) {
          await this.airQualityModel.insertMany(records);
          records.length = 0;
        }
      }
      stream.resume();
    } catch (e) {
      stream.emit('error', e);
    }
  }

  private async processEndOfStream(
    stream: NodeJS.ReadableStream,
    records: AirQuality[],
    resolve: () => void,
  ): Promise<void> {
    stream.pause();
    try {
      if (records.length > 0) {
        await this.airQualityModel.insertMany(records);
      }
      this.logger.log('Data ingestion completed');
      stream.resume();
      resolve();
    } catch (error) {
      this.logger.error('Error inserting pending records', error);
      throw error;
    }
  }
  //#endregion

  private async removeFile(filePath: string): Promise<void> {
    try {
      await fsPromises.unlink(filePath);
      this.logger.log(`File ${filePath} successfully deleted`);
    } catch (err) {
      this.logger.error('Error deleting the file:', err);
    }
  }
}
