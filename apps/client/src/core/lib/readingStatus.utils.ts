import { STATUS_TYPES, StatusType, ThresholdItem } from '@/core/types/thresholds.type';

export function getReadingStatus(value: number, thresholds: ThresholdItem): StatusType {
  if (value >= thresholds.critical) {
    return STATUS_TYPES.critical;
  }

  if (value >= thresholds.warning) {
    return STATUS_TYPES.warning;
  }

  return STATUS_TYPES.normal;
}
