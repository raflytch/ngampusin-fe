import { JSX } from "react";
import Home from "../pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Post from "@/pages/Post";
import Profile from "@/pages/Profile";

interface Route {
  path: string;
  element: () => JSX.Element;
  protected?: boolean;
}

export const routes: Route[] = [
  {
    path: "/",
    element: Home,
  },
  {
    path: "/auth/login",
    element: Login,
  },
  {
    path: "/auth/register",
    element: Register,
  },
  {
    path: "/post",
    element: Post,
    protected: true,
  },
  {
    path: "/profile",
    element: Profile,
    protected: true,
  },
];
