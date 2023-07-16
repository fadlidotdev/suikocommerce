import {useQuery} from "@tanstack/react-query";
import {Paginate, QueryOptions} from "../types";
import API from "./api";
import {APIGetSingleProductResponse} from "./types";

export const queryKeysCart = ["products"] as const;

export const useQueryGetAllProduct = (filter: Paginate) => {
  return useQuery({
    queryKey: [...queryKeysCart, filter],
    queryFn: () => API.getAll(filter),
  });
};

export const useQueryGetSingleProduct = (
  id: number | undefined,
  options?: QueryOptions<APIGetSingleProductResponse>,
) => {
  return useQuery({
    queryKey: ["carts", id],
    queryFn: () => API.getSingle(id as number),
    ...options,
  });
};
