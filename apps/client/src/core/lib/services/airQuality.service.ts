import {
  AirQualityDataByParameter,
  AirQualityParameter,
  AirQualityType,
} from '@/core/types/airQuality.type';
import { PaginationState } from '@/core/types/pages.type';

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3050';

export class AirQualityService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = `${API_URL}/api/air-quality`;
  }

  private async request<T>(endpoint: string, config: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const finalConfig = { ...config };

    const response = await fetch(url, finalConfig);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  }

  public getAllByParameter(params: {
    parameter: AirQualityParameter;
    startDate?: string;
    endDate?: string;
  }) {
    const urlParams = new URLSearchParams(params).toString();
    const endpoint = `/by-parameter`;
    const url = urlParams ? `${endpoint}?${urlParams}` : endpoint;
    return this.request<PaginationState<AirQualityDataByParameter>>(url, {
      method: 'GET',
    });
  }

  public getAll({
    limit,
    ...params
  }: {
    startDate: string;
    endDate: string;
    page: number;
    limit?: number;
  }) {
    const urlParams = new URLSearchParams({
      ...params,
      ...(limit && { limit: limit.toString() }),
      page: params.page.toString(),
    }).toString();
    return this.request<PaginationState<AirQualityType>>(`?${urlParams}`, {
      method: 'GET',
    });
  }

  public getById<T>(itemId: string): Promise<T> {
    return this.request<T>(`/${itemId}`, {
      method: 'GET',
    });
  }

  public uploadFile(
    file: FormData,
    onUploadProgress?: (progressEvent: ProgressEvent) => void,
  ): { promise: Promise<unknown>; abort: () => void } {
    const xhr = new XMLHttpRequest();
    const promise = new Promise((resolve, reject) => {
      xhr.upload.onprogress = onUploadProgress || null;

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(true);
        } else {
          const response = JSON.parse(xhr.responseText);
          reject(new Error(response.message));
        }
      };

      xhr.onerror = () => reject(new Error('Network error'));
      xhr.onabort = () => {
        reject(new Error('Request aborted'));
      };

      xhr.open('POST', `${this.baseUrl}/upload-data`, true);
      xhr.send(file);
    });

    return { promise, abort: () => xhr.abort() };
  }
}

const airQualityService = new AirQualityService();
export default airQualityService;
