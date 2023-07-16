import {createPaginationObject} from "@/utils/core";
import {createHttp} from "@/utils/http";
import {Paginate} from "../types";
import {
  APIGetAllProductResponse,
  APIGetProductCategoriesResponse,
  APIGetSingleProductResponse,
} from "./types";

const http = createHttp({isAuth: true});

const API = {
  getAll: (paginate: Paginate): Promise<APIGetAllProductResponse> =>
    http({
      method: "GET",
      url: "/products",
      params: createPaginationObject(paginate.limit, paginate.page),
    }),

  getSingle: (id: number): Promise<APIGetSingleProductResponse> =>
    http({
      method: "GET",
      url: `/products/${id}`,
    }),

  getAllByCategory: (
    category: string,
    paginate: Paginate,
  ): Promise<APIGetAllProductResponse> =>
    http({
      method: "GET",
      url: `/products/category/${category}`,
      params: createPaginationObject(paginate.limit, paginate.page),
    }),

  getCategories: (): Promise<APIGetProductCategoriesResponse> =>
    http({
      method: "GET",
      url: "products/categories",
    }),

  search: (q: string, paginate: Paginate): Promise<APIGetAllProductResponse> =>
    http({
      method: "GET",
      url: "/products/search",
      params: {q, ...createPaginationObject(paginate.limit, paginate.page)},
    }),
};

export default API;
