import {useDebounce, useDisclosure} from "@/hooks";
import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/router";

import {classes} from "@/utils/core";
import {routes} from "@/utils/routes";

type NavItemProps = {
  href: string;
  label: string;
  iconSrc: string;
  active?: boolean;
};

const NavItem = ({href, label, iconSrc, active}: NavItemProps) => (
  <Link href={href} title={label}>
    <div
      className={classes(
        "w-fit md:w-full mx-auto md:flex items-center gap-3 md:p-2 md:rounded-2xl justify-center md:justify-normal transition-all hover:bg-gray-100 rounded-full",
        active && "md:bg-gray-200",
      )}>
      <div
        className={classes(
          "p-2 rounded-full md:rounded-xl",
          active && "bg-gray-200 md:bg-gray-100",
        )}>
        <Image src={iconSrc} width={20} height={20} alt={label} />
      </div>

      <div className="hidden md:block">
        <span className="text-lg font-bold">{label}</span>
      </div>
    </div>
  </Link>
);

const DashboardPage = () => {
  const {pathname} = useRouter();

  const [showSidebar, {onToggle: onToggleSidebar}] = useDisclosure(true);
  const delayedShowSidebar = useDebounce(showSidebar, 100);

  return (
    <div className="relative flex h-screen bg-gray-100">
      {/* SIDEBAR */}
      <aside
        className={classes(
          "z-30 transition-all duration-300 w-16 shadow-sm md:shadow-none fixed md:w-[250px] min-h-screen bg-white md:pl-8 md:pr-2 pt-16 pb-8 flex flex-col",
          !showSidebar && "-ml-16 ",
        )}>
        <button
          onClick={onToggleSidebar}
          className="block w-8 h-8 mx-auto mb-8 md:hidden"
          mx-auto>
          <Image src="/logo.svg" width={32} height={32} alt="Company logo" />
        </button>

        <div className="hidden md:block">
          <Image
            className="relative mx-auto mb-8 left-1"
            src="/logo.svg"
            width={80}
            height={80}
            alt="Company logo"
          />
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
        onClick={onToggleSidebar}
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
            <div className="flex items-center justify-center h-full">
              <div className="flex flex-col gap-3 text-center md:flex-row">
                <Image
                  className="block mx-auto opacity-60"
                  src="/logo.svg"
                  width={100}
                  height={100}
                  alt="Company logo"
                />
                <div className="space-y-1">
                  <h1 className="text-2xl font-bold drop-shadow-lg">
                    CMS Suicommerce
                  </h1>
                  <span className="text-gray-500">
                    Smart. Beautiful. Ecommerce.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
