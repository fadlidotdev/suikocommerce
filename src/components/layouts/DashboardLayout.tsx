import {useDisclosure} from "@/hooks";
import {classes} from "@/utils/core";

import Sidebar from "./Sidebar";

type Props = {children: JSX.Element};

const DashboardLayout = ({children}: Props) => {
  const [showSidebar, {onToggle: onToggleSidebar}] = useDisclosure(true);

  return (
    <div className="relative flex h-screen bg-gray-100">
      {/* SIDEBAR */}
      <Sidebar show={showSidebar} onToggle={onToggleSidebar} />

      {/* ASIDE SPACER */}
      <div
        className={classes(
          "block w-16 md:w-[300px] bg-gray-100 md:bg-white",
          !showSidebar && "hidden",
        )}
      />

      {/* DASHBOARD CONTENT */}
      <main className="w-full bg-white">
        <div className="relative min-h-screen p-4 pr-0 bg-gray-100 md:bg-white md:p-8">
          <div className="absolute top-0 bottom-0 right-0 p-2 overflow-auto bg-gray-100 rounded-none md:p-8 left-2.5 md:rounded-2xl md:inset-8">
            <div className="h-full">{children}</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
