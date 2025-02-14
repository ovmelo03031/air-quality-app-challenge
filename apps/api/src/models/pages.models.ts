export interface PaginationState<T> {
  data: T[];
  metadata: {
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
    totalPages: number;
    interval?: number;
  };
}
