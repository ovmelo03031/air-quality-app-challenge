export type StatusType = 'normal' | 'warning' | 'critical';
export const STATUS_TYPES: Record<StatusType, StatusType> = {
  normal: 'normal',
  warning: 'warning',
  critical: 'critical',
};

export interface StatusConfigItem {
  icon: React.ReactNode;
  text: string;
  description: string;
}
export type StatusConfig = Record<StatusType, StatusConfigItem>;

export type ThresholdItem = { warning: number; critical: number; unit: string };
export type Thresholds = Record<string, ThresholdItem>;
