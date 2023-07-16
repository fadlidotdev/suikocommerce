import {UseQueryOptions, useQuery} from "@tanstack/react-query";
import {Paginate} from "../types";
import CartAPI from "./api";
import {APIGetSingleCartResponse} from "./types";

export const queryKeysCart = ["carts"] as const;

type QueryOptions<T> = UseQueryOptions<T, string>;

export const useQueryGetAllCart = (filter: Paginate) => {
  return useQuery({
    queryKey: [...queryKeysCart, filter],
    queryFn: () => CartAPI.getAll(filter),
  });
};

export const useQueryGetSingleCart = (
  id: number | undefined,
  options?: QueryOptions<APIGetSingleCartResponse>,
) => {
  return useQuery<APIGetSingleCartResponse, string>({
    queryKey: ["carts", id],
    queryFn: () => CartAPI.getSingle(id as number),
    ...options,
  });
};
