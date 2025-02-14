import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, PipelineStage } from 'mongoose';
import { AirQuality } from './schemas/air-quality.schema';
import * as dayjs from 'dayjs';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';
import { PaginationState } from '@models/pages.models';
import {
  DateRangeDto,
  Parameter,
  ParameterQueryDtoWithoutPage,
} from './dto/query-params.dto';
import { LIMIT_PAGE } from '@helpers/constants';
import {
  determinateInterval,
  getCorrectedDateRange,
} from '@helpers/dates.helpers';
import { IntervalByParameters } from '@models/interval-by-parameters';

dayjs.extend(customParseFormat);

@Injectable()
export class AirQualityService {
  constructor(
    @InjectModel(AirQuality.name)
    private airQualityModel: Model<AirQuality>,
  ) {}

  async getDataInDateRange({
    startDate: startDateParams,
    endDate: endDateParams,
    page = 0,
    limit = LIMIT_PAGE,
  }: DateRangeDto): Promise<PaginationState<AirQuality>> {
    const { startDate, endDate } = getCorrectedDateRange(
      startDateParams,
      endDateParams,
    );
    const query: FilterQuery<AirQuality> = {
      timestamp: { $gte: startDate, $lte: endDate },
    };

    const [data, totalItems] = await Promise.all([
      this.airQualityModel
        .find(query)
        .skip(page * limit)
        .limit(limit)
        .sort({ timestamp: 1 })
        .lean()
        .exec(),
      this.airQualityModel.countDocuments(query),
    ]);

    return {
      data,
      metadata: {
        totalItems,
        currentPage: page + 1,
        itemsPerPage: limit,
        totalPages: Math.ceil(totalItems / limit),
      },
    };
  }

  /**
   * Retrieves paginated air quality data filtered by date range and projects only the timestamp and a specific parameter.
   *
   * @param parameter - The air quality parameter to project (must be one of the allowed keys).
   * @param startDate - Optional start date for filtering.
   * @param endDate - Optional end date for filtering.
   */
  async getParameterData({
    parameter,
    endDate: endDateParam,
    startDate: startDateParam,
  }: ParameterQueryDtoWithoutPage): Promise<
    IntervalByParameters<Partial<AirQuality>>
  > {
    const startDate = startDateParam
      ? dayjs(startDateParam).startOf('day').toDate()
      : undefined;
    const endDate = endDateParam
      ? dayjs(endDateParam).endOf('day').toDate()
      : undefined;

    const query: FilterQuery<AirQuality> = {
      ...((startDate || endDate) && {
        timestamp: {
          ...(startDate && { $gte: startDate }),
          ...(endDate && { $lte: endDate }),
        },
      }),
    };

    const projection = { timestamp: 1, [parameter]: 1, _id: 1 };

    if (startDate && endDate) {
      return this.getParameterDataByDataRange(parameter, startDate, endDate);
    }

    const data = await this.airQualityModel
      .find(query, projection)
      .sort({ timestamp: 1 })
      .limit(LIMIT_PAGE)
      .lean()
      .exec();

    return {
      data,
      interval: 1,
    };
  }

  async getParameterDataByDataRange(
    parameter: Parameter,
    startDate: Date,
    endDate: Date,
  ) {
    const totalDays = dayjs(endDate).diff(dayjs(startDate), 'day');
    const interval = determinateInterval(totalDays);

    /*
        Use an aggregation pipeline to "sample" the data.
        We add a field (diffHours) that computes the number of hours between the document's
        timestamp and the startDate. Then we only keep those documents where the remainder
        of dividing diffHours by our interval is 0. This ensures we only get the row
        that exactly matches the interval.totalDays
      */
    const pipeline: PipelineStage[] = [
      {
        $match: {
          timestamp: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $addFields: {
          diffHours: {
            $toInt: {
              $divide: [
                { $subtract: ['$timestamp', startDate] },
                1000 * 60 * 60,
              ],
            },
          },
        },
      },
      {
        $match: {
          $expr: {
            $eq: [{ $mod: ['$diffHours', interval] }, 0],
          },
        },
      },
      { $project: { timestamp: 1, [parameter]: 1, _id: 1 } },
      { $sort: { timestamp: 1 } },
    ];

    const data = await this.airQualityModel
      .aggregate<Partial<AirQuality>>(pipeline)
      .exec();

    return {
      data,
      interval,
    };
  }

  async getDatasetById(id: string) {
    const data = await this.airQualityModel.findById(id).exec();
    if (!data) {
      throw new NotFoundException('Data not found');
    }

    return data;
  }
}
