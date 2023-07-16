import {UseQueryOptions} from "@tanstack/react-query";

export type Paginate = {
  limit: number;
  page: number;
};

export type QueryOptions<T> = UseQueryOptions<T, string>;
