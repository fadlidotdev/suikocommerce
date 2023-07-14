import Image from "next/image";
import Link from "next/link";

import {classes} from "@/utils/core";

type Props = {
  href: string;
  label: string;
  iconSrc: string;
  active?: boolean;
};

const NavItem = ({href, label, iconSrc, active}: Props) => (
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

export default NavItem;
