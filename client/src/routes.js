

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
import Couponcreate from "layouts/coupon/couponcreate";
import Couponlist from 'layouts/coupon/couponlist'
import Couponedit from 'layouts/coupon/couponedit'
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
import UserSignup from "userside/usersignup"
import UserReg from "userside/userReg";
import Forgot from "userside/forgot";
import Otp from "userside/otp";
import UserProfile from "userside/userProfile";
import ProfileEdit from "userside/profileEdit";
import Shipping from "userside/shipping"
import Invoice from "userside/invoice";
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
  
  {
    
    key: "couponcreate",
    route: "/couponcreate",
    component: <Couponcreate />,
    noCollapse: true,
  },
  {
    
    key: "couponedit",
    route: "/couponedit/:id",
    component: <Couponedit />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Coupon",
    icon: <CreditCard size="12px" />,
    key: "couponclist",
    route: "/couponlist",
    component: <Couponlist />,
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
  {
    key: "user-signin",
    route: "/user-signin",
    component: <UserSignup/>,
    noCollapse: true,
  },
  {
    key: "user-register",
    route: "/user-register",
    component: <UserReg/>,
    noCollapse: true,
  },
  {
    key: "forgot",
    route: "/forgot",
    component: <Forgot/>,
    noCollapse: true,
  },
  {
    key: "otp",
    route: "/otp/:id",
    component: <Otp/>,
    noCollapse: true,
  },
  {
    key: "profile",
    route: "/profile-user",
    component: <UserProfile/>,
    noCollapse: true,
  },
  {
    key: "profile-editing",
    route: "/profile-editing/:id",
    component: <ProfileEdit/>,
    noCollapse: true,
  },
  {
    key: "shipping",
    route: "/shipping",
    component: <Shipping/>,
    noCollapse: true,
  },
  {
    key: "invoice",
    route: "/invoice",
    component: <Invoice/>,
    noCollapse: true,
  },

];

export default routes;
