import {ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";

export const classes = (...inputs: ClassValue[]) => twMerge(clsx(...inputs));
