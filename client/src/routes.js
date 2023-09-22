/**
=========================================================
* Soft UI Dashboard React - v4.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Soft UI Dashboard React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Soft UI Dashboard React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import VirtualReality from "layouts/virtual-reality";
import RTL from "layouts/rtl";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
//
import Category from 'layouts/category/categories';
import Categorycreate from 'layouts/category/categorycreate'
import CategoryEdit from 'layouts/category/categoryedit'
import Productlist from 'layouts/products/productlist'
import Productcreate from "layouts/products/productcreate";
import Productedit from "layouts/products/productedit";
// import SignUp from "layouts/authentication/sign-up";
import SignUp from "layouts/adminusers/admincreate"
import AdminAdd from "layouts/adminusers/adminadd"
import AdminEdit from 'layouts/adminusers/adminedit'
import EditProfile from 'layouts/profile/editprofile'
import BannerAdd from "layouts/Banner/bannerAdd";
import Bannerlist from "layouts/Banner/bannerlist";
// Soft UI Dashboard React icons
import Shop from "examples/Icons/Shop";
import Office from "examples/Icons/Office";
import Settings from "examples/Icons/Settings";
import Document from "examples/Icons/Document";
import SpaceShip from "examples/Icons/SpaceShip";
import CustomerSupport from "examples/Icons/CustomerSupport";
import CreditCard from "examples/Icons/CreditCard";
import Cube from "examples/Icons/Cube";

import Home from 'userside/home'
import AllProduct from 'userside/mens'
import AllWatch from 'userside/AllWatches'
import Aboutpage from'userside/About'
import Whishlist from 'userside/whishlist'
import Addtocart from "userside/Addtocart";
const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <Shop size="12px" />,
    component: <Dashboard />,
    noCollapse: true,
  },
  // {
  //   type: "collapse",
  //   name: "Tables",
  //   key: "tables",
  //   route: "/tables",
  //   icon: <Office size="12px" />,
  //   component: <Tables />,
  //   noCollapse: true,
  // },

    {
    
    key: "bannercreate",
    route: "/bannercreate",
    component: <BannerAdd />,
    noCollapse: true,
  },
 
  {
    type: "collapse",
    name: "Banner",
    icon: <Office size="12px" />,
    key: "banner",
    route: "/banner",
    component: <Bannerlist/>,
    noCollapse: true,
  },
  {
    key: "Productcreate",
    route: "/productcreate",
    component: <Productcreate />,
    noCollapse: true,
  },
  {
    key: "Productedit",
    route: "/productedit/:id",
    component: <Productedit />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Product",
    key: "productlist",
    route: "/productlist",
    icon: <Office size="12px" />,
    component: <Productlist/>,
    noCollapse: true,
  },
  // {
  //   type: "collapse",
  //   name: "Billing",
  //   key: "billing",
  //   route: "/billing",
  //   icon: <CreditCard size="12px" />,
  //   component: <Billing />,
  //   noCollapse: true,
  // },
  {
    type: "collapse",
    name: "Admin-Users",
    key: "adminusers",
    route: "/AdminUsers",
    icon: <CreditCard size="12px" />,
    component: <AdminAdd />,
    noCollapse: true,  
  },
  {
    type: "collapse",
    name: "category",
    key: "category",
    route: "/category/list",
    icon: <CustomerSupport size="12px" />,
    component: <Category />,
    noCollapse: true,
  },
  // {
  //   type: "collapse",
  //   name: "Virtual Reality",
  //   key: "virtual-reality",
  //   route: "/virtual-reality",
  //   icon: <Cube size="12px" />,
  //   component: <VirtualReality />,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "RTL",
  //   key: "rtl",
  //   route: "/rtl",
  //   icon: <Settings size="12px" />,
  //   component: <RTL />,
  //   noCollapse: true,
  // },
  { type: "title", title: "Account Pages", key: "account-pages" },

  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    route: "/profile",
    icon: <CustomerSupport size="12px" />,
    component: <Profile />,
    noCollapse: true,
  },
  {
    key: "editprofile",
    route: "/editprofile/:id",
    component: < EditProfile/>,
    noCollapse: true,

  },
  
    // key: "changepassword",
    // route: "/changepassword",
    // component: <Password/>,
    // noCollapse: true,

  
  {
    // type: "collapse",
    // name: "Sign In",
    key: "sign-in",
    route: "/authentication/sign-in",
    // icon: <Document size="12px" />,
    component: <SignIn />,
    noCollapse: true,
  },
  {
    // type: "collapse",
    // name: "Sign up",
    key: "sign-up",
    route: "/admin/create",
    component: <SignUp />,
    noCollapse: true,

  },
  {
    key: "edit",
    route: "/admin/edit/:id",
    component: <AdminEdit />,
    noCollapse: true,

  },
  {
    key: "categorycreate",
    route: "/category/create",
    component: <Categorycreate />,
    noCollapse: true,

  },
  {
    key: "categoryedit",
    route: "/category/edit/:id",
    component: <CategoryEdit />,
    noCollapse: true,

  },
  {
    key: "home",
    route: "/homepage",
    component: <Home />,
    noCollapse: true,

  },
  {
    key: "allproduct",
    route: "/allproduct/:id",
    component: <AllProduct />,
    noCollapse: true,

  },
  {
    key: "allwatch",
    route: "/allwatch",
    component: <AllWatch />,
    noCollapse: true,

  },
  {
    key: "about",
    route: "/about-product/:id",
    component: <Aboutpage/>,
    noCollapse: true,

  },
  {
    key: "whishlist",
    route: "/whishlist",
    component: <Whishlist/>,
    noCollapse: true,

  },
  {
    key: "Addtocart",
    route: "/addtocart",
    component: <Addtocart/>,
    noCollapse: true,
  },

];

export default routes;
