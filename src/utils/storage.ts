import {Constant} from "./constants";

export const createStorage = (key: Constant, value: string) =>
  localStorage.setItem(key, value);

export const removeStorage = (key: Constant) => localStorage.removeItem(key);
