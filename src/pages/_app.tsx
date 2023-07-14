import DashboardLayout from "@/components/layouts/DashboardLayout";
import "@/styles/globals.css";
import {routes} from "@/utils/routes";
import type {AppProps} from "next/app";
import {useRouter} from "next/router";

const App = ({Component, pageProps}: AppProps) => {
  const {pathname} = useRouter();

  const isDashboard =
    pathname !== routes("dashboard/login") && pathname.startsWith("/dashboard");

  if (isDashboard)
    return (
      <DashboardLayout>
        <Component {...pageProps} />
      </DashboardLayout>
    );

  return <Component {...pageProps} />;
};

export default App;
