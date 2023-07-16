import Router from "next/router";
import {createContext, useContext, useEffect, useState} from "react";

import constants from "@/utils/constants";
import {routes} from "@/utils/routes";
import {removeStorage} from "@/utils/storage";

const authContext = createContext<{
  accessToken: string | null;
  logout: VoidFunction;
}>({
  accessToken: null,
  logout: () => {},
});

type Props = {
  children: JSX.Element | JSX.Element[];
};

const DashboardAuthContextProvider = ({children}: Props) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const token = localStorage.getItem(constants("accessToken")) || "";
      setAccessToken(token);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn(
        "Error reading local storage with key of " + constants("accessToken"),
      );
      setAccessToken("");
    }
  }, []);

  useEffect(() => {
    if (typeof accessToken === "string") {
      Router.push(
        accessToken ? routes("dashboard") : routes("dashboard/login"),
      );
    }
  }, [accessToken]);

  const logout = () => {
    removeStorage(constants("accessToken"));
    Router.replace(routes("dashboard/login"));
  };

  return (
    <authContext.Provider value={{accessToken, logout}}>
      {children}
    </authContext.Provider>
  );
};

export const useContextAuth = () => useContext(authContext);

export default DashboardAuthContextProvider;
