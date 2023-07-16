import {useQuery} from "@tanstack/react-query";
import {Paginate, QueryOptions} from "../types";
import API from "./api";
import {APIGetSingleCartResponse} from "./types";

export const queryKeysCart = ["carts"] as const;

export const useQueryGetAllCart = (filter: Paginate) => {
  return useQuery({
    queryKey: [...queryKeysCart, filter],
    queryFn: () => API.getAll(filter),
  });
};

export const useQueryGetSingleCart = (
  id: number | undefined,
  options?: QueryOptions<APIGetSingleCartResponse>,
) => {
  return useQuery({
    queryKey: [...queryKeysCart, id],
    queryFn: () => API.getSingle(id as number),
    ...options,
  });
};
