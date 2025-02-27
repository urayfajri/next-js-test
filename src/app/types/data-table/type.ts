export interface DataTableColumn<T> {
  key: keyof T;
  header: string;
  render?: (row: T) => React.ReactNode; // Accept rowIndex
}

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
}
