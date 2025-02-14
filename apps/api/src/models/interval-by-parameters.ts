export interface IntervalByParameters<T> {
  data: T[];
  interval?: number;
}

export type ValueOf<T> = T[keyof T];
