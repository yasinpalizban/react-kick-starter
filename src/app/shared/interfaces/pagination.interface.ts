export interface IPagination {
  hasMore: boolean,
  total: number,
  perPage: null,
  pageCount: number,
  currentPage: number,
  next: string | null,
  previous: string | null,
}
