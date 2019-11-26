import Tables from "./views/pages/tables/Tables.jsx";
import AccountSetting from "./containers/AccountSetting";
import OrderPage from "./containers/OrderPage";
import SupportPage from "./containers/SupportPage";
import LogoutPage from "./containers/LogoutPage";
import IntroductionPage from "./containers/IntroductionPage";
import Referral from "./containers/Referral";

const routes = [
  {
    path: "/introduction",
    name: "Project Introduction",
    icon: "fa fa-info-circle",
    component: IntroductionPage,
    layout: "/user"
  },
  {
    path: "/profile",
    name: "User Profile",
    icon: "fa fa-user",
    component: AccountSetting,
    layout: "/user"
  },
  {
    path: "/token",
    name: "Token Purchase",
    icon: "fa fa-shopping-cart",
    component: OrderPage,
    layout: "/user"
  },
  {
    path: "/support",
    name: "Customer Support",
    icon: "fa fa-question-circle",
    component: SupportPage,
    layout: "/user"
  },
  {
    path: "/referral",
    name: "Referral",
    icon: "fa fa-question-circle",
    component: Referral,
    layout: "/user"
  },
  {
    path: "/logout",
    name: "Logout",
    icon: "fa fa-cog",
    component: LogoutPage,
    layout: "/user"
  },
];

export default routes;
