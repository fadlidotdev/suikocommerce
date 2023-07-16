import {createPaginationObject} from "@/utils/core";
import {createHttp} from "@/utils/http";
import {Paginate} from "../types";
import {APIGetAllProductResponse} from "./types";

const http = createHttp({isAuth: true});

const API = {
  getAll: (paginate: Paginate): Promise<APIGetAllProductResponse> => {
    const {limit, page} = paginate;

    return http({
      method: "GET",
      url: "/products",
      params: createPaginationObject(limit, page),
    });
  },

  getSingle: (id: number) =>
    http({
      method: "GET",
      url: `/products/${id}`,
    }),
};

export default API;
