import Dashboard from "pages/Dashboard";
import Members from "pages/Members";
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
    path: "/members",
    main: Members,
    name: "Members",
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
