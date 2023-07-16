export const createStorage = (key: string, value: string) =>
  localStorage.setItem(key, value);

export const removeStorage = (key: string) => localStorage.removeItem(key);
