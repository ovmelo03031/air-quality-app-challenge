import { AirQualityController } from './air-quality.controller';
import { AirQualityService } from './air-quality.service';
import {
  DateRangeDto,
  Parameter,
  ParameterQueryDto,
} from './dto/query-params.dto';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { BadRequestException } from '@nestjs/common';
import { AirQualityUploadService } from '@air-quality/air-quality-upload.service';

// Mock del servicio
const mockAirQualityService = {
  getParameterData: vi.fn(),
  getDataInDateRange: vi.fn(),
  getDatasetById: vi.fn(),
};

const mockAirQualityUploadService = {
  ingestCsvData: vi.fn(),
};

let controller: AirQualityController;

beforeEach(() => {
  controller = new AirQualityController(
    mockAirQualityService as unknown as AirQualityService,
    mockAirQualityUploadService as unknown as AirQualityUploadService,
  );
});

describe('AirQualityController', () => {
  it('should ingest CSV data', async () => {
    const mockFile = {
      originalname: 'data.csv',
      path: '/fake/path',
    } as Express.Multer.File;
    await controller.ingestData(mockFile);
    expect(mockAirQualityUploadService.ingestCsvData).toHaveBeenCalledWith(
      mockFile,
    );
  });

  it('should get parameter data', async () => {
    const query: ParameterQueryDto = {
      parameter: Parameter.CO,
      page: 1,
      limit: 30,
    };
    mockAirQualityService.getParameterData.mockResolvedValue({
      data: [],
      metadata: {},
    });
    const result = await controller.getParameterData(query);
    expect(result).toEqual({ data: [], metadata: {} });
    expect(mockAirQualityService.getParameterData).toHaveBeenCalledWith(
      'co',
      undefined,
      undefined,
      1,
    );
  });

  it('should get data within a date range', async () => {
    const query: DateRangeDto = {
      startDate: '2024-01-01',
      endDate: '2024-01-31',
      page: 0,
      limit: 30,
    };
    mockAirQualityService.getDataInDateRange.mockResolvedValue({
      data: [],
      metadata: {},
    });
    const result = await controller.getDataInDateRange(query);
    expect(result).toEqual({ data: [], metadata: {} });
    expect(mockAirQualityService.getDataInDateRange).toHaveBeenCalledWith(
      new Date('2024-01-01'),
      new Date('2024-01-31'),
      0,
    );
  });

  it('should get dataset details', async () => {
    mockAirQualityService.getDatasetById.mockResolvedValue({
      _id: '123',
      timestamp: { $gte: new Date('2024-01-01'), $lte: new Date('2024-01-31') },
      co: 1.5,
      nox: 2.0,
      no2: 3.0,
      benzene: 4.0,
      nmhc: 5.0,
      pt08S1: 6.0,
      pt08S2: 7.0,
      pt08S3: 8.0,
      pt08S4: 9.0,
      pt08S5: 10.0,
      temperature: 11.0,
      relative_humidity: 12.0,
      absolute_humidity: 13.0,
    });
    const result = await controller.getDatasetById('123');
    expect(result).toEqual(expect.any(Object));
    expect(mockAirQualityService.getDatasetById).toHaveBeenCalled();
  });

  it('should throw BadRequestException if file is not CSV', async () => {
    const mockFile = {
      originalname: 'data.txt',
      mimetype: 'text/plain',
    } as Express.Multer.File;
    await expect(controller.ingestData(mockFile)).rejects.toThrow(
      BadRequestException,
    );
  });
});
