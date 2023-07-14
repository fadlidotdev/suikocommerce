const listOfRoutes = [
  "dashboard",
  "dashboard/login",
  "dashboard/products",
  "dashboard/carts",
] as const;

type Route = (typeof listOfRoutes)[number];

export const routes = (route: Route) => "/".concat(route);
