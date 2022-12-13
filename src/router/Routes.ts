import { ComponentType } from "react";
import IndexPage from "../pages";
import Login from "../pages/auth/login";
import Registration from "../pages/auth/registration";
import BoardPage from "../pages/board";

interface IRoute {
  path: string,
  Component: ComponentType
}

enum Routes {
  MAIN_ROUTE = '/',
  LOGIN_ROUTE = '/login',
  REGISTRATION_ROUTE = '/registration',
  BOARD_ROUTE = '/board/:id',
  REDIRECT_ROUTE = '*'
}

export const publicRoutes: IRoute[] = [
  {
    path: Routes.LOGIN_ROUTE,
    Component: Login
  },
  {
    path: Routes.REGISTRATION_ROUTE,
    Component: Registration
  },
  {
    path: Routes.REDIRECT_ROUTE,
    Component: Login
  },
]

export const privateRoutes: IRoute[] = [
  {
    path: Routes.MAIN_ROUTE,
    Component: IndexPage
  },
  {
    path: Routes.REDIRECT_ROUTE,
    Component: IndexPage
  },
  {
    path: Routes.BOARD_ROUTE,
    Component: BoardPage
  },
]

