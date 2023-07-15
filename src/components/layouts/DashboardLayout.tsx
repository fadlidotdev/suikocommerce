import {useDisclosure} from "@/hooks";
import {classes} from "@/utils/core";
import Router from "next/router";

import Sidebar from "./Sidebar";
import {Show} from "../common";
import Image from "next/image";

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

type DashboardHeaderProps = {
  title: string | JSX.Element;
  rightContent?: JSX.Element;
  hasBack?: boolean;
};

export const DashboardHeader = ({
  title,
  rightContent,
  hasBack = false,
}: DashboardHeaderProps) => {
  const onBack = () => Router.back();

  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Show when={hasBack}>
          <button onClick={onBack}>
            <Image
              src="/icons/arrow-left.svg"
              width={24}
              height={24}
              alt="Back"
            />
          </button>
        </Show>

        {typeof title === "string" ? (
          <h1 className="text-2xl font-bold">{title}</h1>
        ) : (
          title
        )}
      </div>

      {rightContent}
    </header>
  );
};

type DashboardContentProps = {
  children: JSX.Element | JSX.Element[];
};

export const DashboardContent = ({children}: DashboardContentProps) => {
  return <div className="h-full pt-8 pb-4 overflow-auto">{children}</div>;
};

export default DashboardLayout;
