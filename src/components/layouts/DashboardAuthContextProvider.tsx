import Router from "next/router";
import {createContext, useContext, useEffect} from "react";

import useLocalstorage from "@/hooks/useLocalstorage";
import {removeStorage} from "@/utils/storage";
import {routes} from "@/utils/routes";

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
  const accessToken = useLocalstorage<string>("accessToken", "");

  useEffect(() => {
    if (typeof accessToken === "string" && accessToken === "") {
      Router.replace("/dashboard/login");
    }
  }, [accessToken]);

  const logout = () => {
    removeStorage("accessToken");
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
