import React, { } from "react";
import { Outlet } from "react-router-dom";
import { UserDashboardHeader } from "./components/UserDashboardHeader";

export const UserLayout = React.memo(() => {
  return (<>
   <div className="m-0 mx-auto antialiased  ">
   <UserDashboardHeader logo="./img/logo.jpg" title="My company" logoLabel="" />
   <div className="ml-3">
   <Outlet />
   </div>

   </div>
    
  </>);

});