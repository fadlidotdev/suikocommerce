import {useMutation} from "@tanstack/react-query";
import AuthAPI from "./api";
import {APILoginParams, APILoginResponse} from "./types";

export const useMutationLogin = () => {
  return useMutation<APILoginResponse, string, APILoginParams>({
    mutationFn: AuthAPI.login,
  });
};
