export interface PaginationState<T> {
  data: T[];
  metadata: {
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
    totalPages: number;
  };
}

export interface IntervalByParameters<T> {
  data: T[];
  interval?: number;
}
