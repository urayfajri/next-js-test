export interface ApiReturn<D> {
  status: number;
  error: string;
  data: D;
}

interface DataPagination<D> {
  limit: number;
  current_page: number;
  total_page: number;
  count: number;
  total: number;
  data: D;
}

export interface ApiReturnPagination<D> {
  status: number;
  error: string;
  data: DataPagination<D>;
}
