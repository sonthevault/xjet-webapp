import Tables from "./views/pages/tables/Tables.jsx";
import AccountSetting from "./containers/AccountSetting";
import OrderPage from "./containers/OrderPage";

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
];

export default routes;
