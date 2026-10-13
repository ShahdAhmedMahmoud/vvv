export interface ApiResponse<T> {
  data: T;
}

export interface Paginated<T> {
  items: T[];
  total: number;
}
