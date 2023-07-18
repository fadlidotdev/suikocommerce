import Image from "next/image";

import {classes} from "@/utils/core";

const Logo = ({width = 24, height = 24, className = ""}) => (
  <Image
    className={classes("block mx-auto w-auto h-auto", className)}
    src="/logo.svg"
    width={width}
    height={height}
    alt="Company logo"
    priority
  />
);

export default Logo;
