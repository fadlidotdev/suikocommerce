import {createHttp} from "@/utils/http";
import {APIGetSingleUserResponse} from "./types";

const http = createHttp({
  isAuth: true,
});

const API = {
  getSingle: (id: number): Promise<APIGetSingleUserResponse> =>
    http({
      method: "GET",
      url: `/users/${id}`,
    }),
};

export default API;
