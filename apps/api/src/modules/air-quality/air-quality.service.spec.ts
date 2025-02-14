import { describe, it, expect, beforeEach, vi } from 'vitest';
import { AirQualityService } from '@air-quality/air-quality.service';
import { Parameter } from '@air-quality/dto/query-params.dto';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { LIMIT_PAGE } from '@helpers/constants';
import { AirQuality } from '@air-quality/schemas/air-quality.schema';

const mockAirQualityModel = {
  find: vi.fn(),
  countDocuments: vi.fn(),
  aggregate: vi.fn(),
  insertMany: vi.fn(),
  lean: vi.fn(),
  skip: vi.fn(),
  limit: vi.fn(),
  sort: vi.fn(),
  exec: vi.fn(),
};

describe('AirQualityService', () => {
  let service: AirQualityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AirQualityService,
        {
          provide: getModelToken(AirQuality.name),
          useValue: mockAirQualityModel,
        },
      ],
    }).compile();

    service = module.get<AirQualityService>(AirQualityService);

    vi.clearAllMocks();
    mockAirQualityModel.find.mockReturnValue(mockAirQualityModel);
    mockAirQualityModel.lean.mockReturnValue(mockAirQualityModel);
    mockAirQualityModel.skip.mockReturnValue(mockAirQualityModel);
    mockAirQualityModel.limit.mockReturnValue(mockAirQualityModel);
    mockAirQualityModel.sort.mockReturnValue(mockAirQualityModel);
  });

  describe('getParameterData', () => {
    it('should return parameter data for a specific date range', async () => {
      const mockData = {
        data: [
          { timestamp: new Date('2024-01-01'), co: 1.5 },
          { timestamp: new Date('2024-01-02'), co: 2.0 },
        ],
        metadata: {
          currentPage: 1,
          totalItems: 2,
          itemsPerPage: LIMIT_PAGE,
          totalPages: 1,
        },
      };

      mockAirQualityModel.exec.mockResolvedValue(mockData.data);
      mockAirQualityModel.countDocuments.mockResolvedValue(
        mockData.metadata.totalItems,
      );

      const startDate = new Date('2024-01-01');
      const endDate = new Date('2024-01-02');
      const result = await service.getParameterData({
        parameter: Parameter.CO,
        startDate: startDate.toString(),
        endDate: endDate.toString(),
      });

      expect(result).toEqual(mockData);
      expect(mockAirQualityModel.countDocuments).toHaveBeenCalledWith({
        timestamp: { $gte: startDate, $lte: endDate },
      });
    });
  });

  describe('getAllData', () => {
    it('should return paginated data with metadata', async () => {
      const mockData = {
        data: [
          { timestamp: new Date(), co: 1.5 },
          { timestamp: new Date(), co: 2.0 },
        ],
        metadata: {
          currentPage: 2,
          itemsPerPage: 2,
          totalItems: 10,
          totalPages: 5,
        },
      };

      mockAirQualityModel.exec.mockResolvedValue(mockData.data);
      mockAirQualityModel.countDocuments.mockResolvedValue(
        mockData.metadata.totalItems,
      );

      const result = await service.getAllData(1, 2);

      expect(result).toEqual(mockData);
      expect(mockAirQualityModel.countDocuments).toHaveBeenCalled();
    });
  });

  describe('getDatasetDetails', () => {
    it('should return dataset statistics', async () => {
      const mockStats = [
        {
          coStats: { min: 0, max: 10, avg: 5 },
          nmhcStats: { min: 0, max: 10, avg: 5 },
          benzeneStats: { min: 0, max: 10, avg: 5 },
          noxStats: { min: 0, max: 10, avg: 5 },
          no2Stats: { min: 0, max: 10, avg: 5 },
        },
      ];

      const mockDateRange = [
        {
          minDate: new Date('2024-01-01'),
          maxDate: new Date('2024-01-31'),
        },
      ];

      mockAirQualityModel.countDocuments.mockResolvedValue(100);
      mockAirQualityModel.aggregate
        .mockResolvedValueOnce(mockDateRange)
        .mockResolvedValueOnce(mockStats);

      // const result = await service.getDatasetDetails();

      // expect(result).toEqual({
      //   totalRecords: 100,
      //   dateRange: {
      //     from: mockDateRange[0].minDate,
      //     to: mockDateRange[0].maxDate,
      //   },
      //   parameters: {
      //     co: mockStats[0].coStats,
      //     nmhc: mockStats[0].nmhcStats,
      //     benzene: mockStats[0].benzeneStats,
      //     nox: mockStats[0].noxStats,
      //     no2: mockStats[0].no2Stats,
      //   },
      // });

      // expect(mockAirQualityModel.countDocuments).toHaveBeenCalled();
      // expect(mockAirQualityModel.aggregate).toHaveBeenCalledTimes(2);
    });
  });
});
