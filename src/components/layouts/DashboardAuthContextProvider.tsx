import Router, {useRouter} from "next/router";
import {createContext, useContext, useEffect} from "react";

import useLocalstorage from "@/hooks/useLocalstorage";
import {removeStorage} from "@/utils/storage";
import {routes} from "@/utils/routes";
import constants from "@/utils/constants";

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
  const accessToken = useLocalstorage<string>(constants("accessToken"), "");

  const {pathname} = useRouter();

  useEffect(() => {
    if (typeof accessToken === "string" && accessToken === "") {
      Router.replace(routes("dashboard/login"));
      return;
    }

    if (pathname.includes(routes("dashboard/login"))) {
      Router.replace(routes("dashboard"));
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
