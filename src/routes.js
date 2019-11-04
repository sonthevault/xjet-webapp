import Tables from "./views/pages/tables/Tables.jsx";
import Transaction from "./containers/Transaction";
import ApiManagement from "./containers/ApiManagement";
import UserManagement from "./containers/UserManagement";
import AccountSetting from "./containers/AccountSetting";

const routes = [
  {
    path: "/settings",
    name: "Account Settings",
    icon: "fa fa-cog text-red",
    component: AccountSetting,
    layout: "/admin"
  },
];

export default routes;
