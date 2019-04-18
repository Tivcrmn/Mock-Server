import Dashboard from "../Dashboard";
import Members from "../Members";
import Profile from "../Profile";
import Systems from "../Systems";
import F0F from "../F0F";

const routes = [
  {
    path: "/",
    exact: true,
    main: Dashboard
  },
  {
    path: "/systems",
    main: Systems
  },
  {
    path: "/members",
    main: Members
  },
  {
    path: "/profile",
    main: Profile
  },
  {
    path: "*",
    main: F0F
  }
];

export default routes;
