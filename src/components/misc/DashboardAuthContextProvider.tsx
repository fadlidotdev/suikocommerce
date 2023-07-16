import Router from "next/router";
import {createContext, useContext, useEffect} from "react";

import useLocalstorage from "@/hooks/useLocalstorage";

const authContext = createContext<{
  accessToken: string | null;
}>({
  accessToken: null,
});

type Props = {
  children: JSX.Element | JSX.Element[];
};

const DashboardAuthContextProvider = ({children}: Props) => {
  const accessToken = useLocalstorage<string>("accessToken");

  useEffect(() => {
    if (typeof accessToken === "string" && accessToken === "") {
      Router.replace("/dashboard/login");
    }
  }, [accessToken]);

  return (
    <authContext.Provider value={{accessToken}}>
      {children}
    </authContext.Provider>
  );
};

export const useContextAuth = () => useContext(authContext);

export default DashboardAuthContextProvider;
