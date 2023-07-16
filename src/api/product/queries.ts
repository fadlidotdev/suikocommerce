import {useQuery} from "@tanstack/react-query";
import {Paginate, QueryOptions} from "../types";
import API from "./api";
import {APIGetAllProductResponse, APIGetSingleProductResponse} from "./types";

export const queryKeysProduct = ["products"] as const;

export const useQueryGetAllProduct = (
  filter: Paginate,
  options?: QueryOptions<APIGetAllProductResponse>,
) => {
  return useQuery({
    queryKey: [...queryKeysProduct, filter],
    queryFn: () => API.getAll(filter),
    ...options,
  });
};

export const useQueryGetSingleProduct = (
  id: number | undefined,
  options?: QueryOptions<APIGetSingleProductResponse>,
) => {
  return useQuery({
    queryKey: [...queryKeysProduct, id],
    queryFn: () => API.getSingle(id as number),
    ...options,
  });
};

export const useQueryGetAllProductByCategory = (
  category: string | undefined,
  filter: Paginate,
  options?: QueryOptions<APIGetAllProductResponse>,
) => {
  return useQuery({
    queryKey: [...queryKeysProduct, "categories", category, filter],
    queryFn: () => API.getAllByCategory(category as string, filter),
    ...options,
  });
};

export const useQueryGetCategories = () => {
  return useQuery({
    queryKey: [...queryKeysProduct, "categories"],
    queryFn: API.getCategories,
  });
};

export const useQuerySearchProducts = (
  q: string,
  filter: Paginate,
  options: QueryOptions<APIGetAllProductResponse>,
) => {
  return useQuery({
    queryKey: [...queryKeysProduct, "search", q, filter],
    queryFn: () => API.search(q, filter),
    ...options,
  });
};
