import {useQuery} from "@tanstack/react-query";
import {QueryOptions} from "../types";
import API from "./api";
import {APIGetSingleUserResponse} from "./types";

export const queryKeysUser = ["users"] as const;

export const useQueryGetSingleUser = (
  id: number | undefined,
  options?: QueryOptions<APIGetSingleUserResponse>,
) => {
  return useQuery({
    queryKey: [...queryKeysUser, id],
    queryFn: () => API.getSingle(id as number),
    ...options,
  });
};
