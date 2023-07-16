import {ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";

export const classes = (...inputs: ClassValue[]) => twMerge(clsx(...inputs));

export const formatToCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    currency: "USD",
    style: "currency",
  }).format(value);

export const createPaginationObject = (limit: number, page: number) => ({
  skip: limit * (page - 1),
  limit,
});

export const capitalize = (value: string | undefined) =>
  !value ? "" : `${value[0].toUpperCase()}${value.slice(1)}`;
