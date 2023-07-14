import Image from "next/image";
import {useRouter} from "next/router";

import {useDebounce} from "@/hooks";
import {classes} from "@/utils/core";
import {routes} from "@/utils/routes";

import {Logo} from "../common";
import NavItem from "./NavItem";
import {useEffect, useRef} from "react";
import useWindowSize from "@/hooks/useWindowSize";

type Props = {
  show: boolean;
  onToggle: () => void;
};

const Sidebar = ({show, onToggle}: Props) => {
  const {pathname} = useRouter();

  const delayedShowSidebar = useDebounce(show, 100);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const {width} = useWindowSize();

  useEffect(
    () => {
      if (width >= 768 && !show) {
        onToggle();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [width, show],
  );

  return (
    <>
      <aside
        ref={sidebarRef}
        className={classes(
          "z-30 transition-all duration-300 w-16 shadow-sm md:shadow-none fixed md:w-[250px] min-h-screen bg-white md:pl-8 md:pr-2 pt-16 pb-8 flex flex-col",
          !show && "-ml-16",
        )}>
        <button
          onClick={onToggle}
          className="block w-8 h-8 mx-auto mb-8 md:hidden">
          <Logo width={32} height={32} />
        </button>

        <div className="hidden md:block">
          <Logo width={80} height={80} className="block mx-auto mb-8" />
        </div>

        <nav>
          <ul className="space-y-3">
            <li>
              <NavItem
                href={routes("dashboard")}
                iconSrc="/icons/dashboard.svg"
                label="Dashboard"
                active={pathname === routes("dashboard")}
              />
            </li>

            <li>
              <NavItem
                href={routes("dashboard/products")}
                iconSrc="/icons/product-list.svg"
                label="Products"
                active={pathname === routes("dashboard/products")}
              />
            </li>

            <li>
              <NavItem
                href={routes("dashboard/carts")}
                iconSrc="/icons/cart.svg"
                label="Carts"
                active={pathname === routes("dashboard/carts")}
              />
            </li>
          </ul>
        </nav>

        <div className="mt-auto">
          <button className="hidden w-full px-5 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg md:block focus:outline-none hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-200 ">
            Log out
          </button>

          <div className="block md:hidden">
            <button className="block mx-auto opacity-70">
              <Image
                src="/icons/logout.svg"
                width={20}
                height={20}
                alt="Log out"
              />
            </button>
          </div>
        </div>
      </aside>

      {/* TOGGLE SIDEBAR */}
      <button
        onClick={onToggle}
        className={classes(
          "fixed scale-0 left-0 z-20 flex items-center justify-center w-16 h-12 transition bg-white rounded-tl-none rounded-bl-none shadow-sm md:shadow-none rounded-tr-xl rounded-br-xl top-14",
          !delayedShowSidebar && "scale-100",
        )}>
        <Image
          className="block w-8 h-8 mx-auto"
          src="/logo.svg"
          width={32}
          height={32}
          alt="Company logo"
        />
      </button>
    </>
  );
};

export default Sidebar;
