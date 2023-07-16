import {createPaginationObject} from "@/utils/core";
import {createHttp} from "@/utils/http";
import {Paginate} from "../types";
import {APIGetAllCartResponse} from "./types";

const http = createHttp({isAuth: true});

const API = {
  getAll: (paginate: Paginate): Promise<APIGetAllCartResponse> => {
    const {limit, page} = paginate;

    return http({
      method: "GET",
      url: "/carts",
      params: createPaginationObject(limit, page),
    });
  },

  getSingle: (id: number) =>
    http({
      method: "GET",
      url: `/carts/${id}`,
    }),
};

export default API;
