import {createHttp} from "@/utils/http";
import {APILoginParams} from "./types";

const http = createHttp({isAuth: true});

const API = {
  login: async (params: APILoginParams) =>
    http({
      method: "POST",
      url: "/auth/login",
      data: params,
    }),
};

export default API;
