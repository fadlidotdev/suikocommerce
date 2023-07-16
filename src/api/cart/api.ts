import {createPaginationObject} from "@/utils/core";
import {createHttp} from "@/utils/http";
import {Paginate} from "../types";
import {APIGetAllCartResponse, APIGetSingleCartResponse} from "./types";

const http = createHttp({isAuth: true});

const API = {
  getAll: (paginate: Paginate): Promise<APIGetAllCartResponse> =>
    http({
      method: "GET",
      url: "/carts",
      params: createPaginationObject(paginate.limit, paginate.page),
    }),

  getSingle: (id: number): Promise<APIGetSingleCartResponse> =>
    http({
      method: "GET",
      url: `/carts/${id}`,
    }),
};

export default API;
