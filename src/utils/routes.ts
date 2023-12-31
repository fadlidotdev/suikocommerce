const listOfRoutes = [
  "dashboard",
  "dashboard/login",
  "dashboard/products",
  "dashboard/products/detail",
  "dashboard/carts",
  "dashboard/carts/detail",
] as const;

type Route = (typeof listOfRoutes)[number];

const routesBuilder = (name: Route, id: string | number) => {
  const routes: Partial<{[key in Route]: string}> = {
    "dashboard/products/detail": "dashboard/products",
    "dashboard/carts/detail": "dashboard/carts",
  };

  return "/".concat(routes[name] as string, "/", id.toString()) ?? "/";
};

export const routes = (route: Route, id?: string | number) => {
  if (id) return routesBuilder(route, id);

  return "/".concat(route);
};
