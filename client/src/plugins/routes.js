import Dashboard from "pages/Dashboard";
import User from "pages/Users";
import UserDetail from "pages/Users/Detail";
import Profile from "pages/Profile";
import Systems from "pages/Systems";
import SystemDetail from "pages/Systems/Detail";
import F0F from "pages/F0F";

const routes = [
  {
    path: "/",
    exact: true,
    main: Dashboard,
    name: "Dashboard",
    show: true,
  },
  {
    path: "/systems",
    main: Systems,
    exact: true,
    name: "Systems",
    show: true,
  },
  {
    path: "/systems/:id",
    main: SystemDetail,
    show: false,
  },
  {
    path: "/user",
    main: User,
    exact: true,
    name: "Users",
    show: true,
  },
  {
    path: "/user/:id",
    main: UserDetail,
    show: false,
  },
  {
    path: "/profile",
    main: Profile,
    name: "Profile",
    show: true,
  },
  {
    path: "*",
    main: F0F,
    show: false,
  },
];

export default routes;
