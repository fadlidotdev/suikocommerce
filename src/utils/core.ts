import {ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";

export const classes = (...inputs: ClassValue[]) => twMerge(clsx(...inputs));

export const formatToCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    currency: "USD",
    style: "currency",
  }).format(value);
