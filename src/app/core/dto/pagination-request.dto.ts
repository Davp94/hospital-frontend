export interface PaginationRequestDto {
  page: number;
  size: number;
  sortBy: string;
  direction: string;
  searchParam: string;
}
