import { JSX, lazy } from "react";

const Home = lazy(() => import("../pages/Home"));

interface Route {
  path: string;
  element: React.LazyExoticComponent<() => JSX.Element>;
  protected?: boolean;
}

export const routes: Route[] = [
  {
    path: "/",
    element: Home,
  },
];
