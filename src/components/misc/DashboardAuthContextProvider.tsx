import {createContext, useContext, useEffect, useState} from "react";
import Router from "next/router";

import {readStorage} from "@/utils/storage";

const authContext = createContext<{
  accessToken: string | null;
}>({
  accessToken: null,
});

type Props = {
  children: JSX.Element | JSX.Element[];
};

const DashboardAuthContextProvider = ({children}: Props) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    try {
      const token = readStorage("accessToken");
      setAccessToken(token || "");
    } catch (error) {}
  }, []);

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
