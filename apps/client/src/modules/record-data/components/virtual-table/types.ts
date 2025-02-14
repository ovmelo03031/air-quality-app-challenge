import { RowData } from '@tanstack/react-table';

declare module '@tanstack/table-core' {
  interface TableMeta<TData extends RowData> {
    handleRowClick: (row: TData) => void;
  }
}
