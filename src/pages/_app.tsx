import DashboardLayout from "@/components/layouts/DashboardLayout";
import DashboardAuthContextProvider from "@/components/misc/DashboardAuthContextProvider";
import "@/styles/globals.css";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import type {AppProps} from "next/app";
import {useRouter} from "next/router";
import {Toaster} from "react-hot-toast";

const queryClient = new QueryClient();

const App = ({Component, pageProps}: AppProps) => {
  const {pathname} = useRouter();

  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />

      {isDashboard ? (
        <DashboardAuthContextProvider>
          <DashboardLayout>
            <Component {...pageProps} />
          </DashboardLayout>
        </DashboardAuthContextProvider>
      ) : (
        <Component {...pageProps} />
      )}
    </QueryClientProvider>
  );
};

export default App;
