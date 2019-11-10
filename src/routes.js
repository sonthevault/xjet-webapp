import Tables from "./views/pages/tables/Tables.jsx";
import AccountSetting from "./containers/AccountSetting";
import OrderPage from "./containers/OrderPage";
import SupportPage from "./containers/SupportPage";
import LogoutPage from "./containers/LogoutPage";

const routes = [
  {
    path: "/profile",
    name: "User Profile",
    icon: "fa fa-cog text-red",
    component: AccountSetting,
    layout: "/user"
  },
  {
    path: "/token",
    name: "Token",
    icon: "fa fa-cog text-red",
    component: OrderPage,
    layout: "/user"
  },
  {
    path: "/support",
    name: "Customer Support",
    icon: "fa fa-cog text-red",
    component: SupportPage,
    layout: "/user"
  },
  {
    path: "/logout",
    name: "Logout",
    icon: "fa fa-cog text-red",
    component: LogoutPage,
    layout: "/user"
  },
];

export default routes;
