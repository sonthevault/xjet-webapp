import Tables from "./views/pages/tables/Tables.jsx";
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
