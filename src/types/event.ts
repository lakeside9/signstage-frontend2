export interface EventContent {
  id: number;
  eventTitle: string;
  eventPlace: string;
  eventFromDt: string;
  eventEndDt: string;
  eventDescription: string;
  createDt: string;
  createId: string;
  modifyDt: string;
  modifyId: string;
}

export interface Pageable {
  paged: boolean;
  pageNumber: number;
  pageSize: number;
  unpaged: boolean;
  offset: number;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
}

export interface EventListResponse {
  status: number;
  message: string;
  data: {
    totalElements: number;
    totalPages: number;
    numberOfElements: number;
    first: boolean;
    last: boolean;
    pageable: Pageable;
    size: number;
    content: EventContent[];
    number: number;
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    empty: boolean;
  };
}

export interface EventSearchParams {
  id?: string;
  eventTitle?: string;
  eventPlace?: string;
  page?: number;
  size?: number;
}
