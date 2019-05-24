import Dashboard from "pages/Dashboard";
import User from "pages/Users";
import Profile from "pages/Profile";
import Systems from "pages/Systems";
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
    name: "Systems",
    show: true,
  },
  {
    path: "/user",
    main: User,
    name: "Users",
    show: true,
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
