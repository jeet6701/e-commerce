// import React from "react";
// import { BrowserRouter, Switch , Route } from "react-router-dom";
// import Header from "./Components/Header";
// import Home from "./Pages/Home";
// import Signin from "./Pages/Singin";
// import Signup from "./Pages/Signup";
// // import Footer from "./Components/Footer";
// import "./Routes.css"

// const Routes = () => {
//   return (
//     <BrowserRouter>
//       <Header />
//       <div className="bodyWrapper">
//         <Switch>
//           <Route path="/" exact component={Home} />
//           <Route path="/signup" exact component={Signup} />
//           <Route path="/signin" exact component={Signin} />
//           {/* <PrivateRoute path="/user" exact component={Demo} /> */}
//         </Switch>
//       </div>

//       {/* <Footer /> */}
//     </BrowserRouter>
//   );
// };

// export default Routes;

import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./Components/Header";
// import AdminRoute from "./auth/helper/AdminRoutes";
// import PrivateRoute from "./helper/PrivateRoutes";
// import Demo from "./helper/Demo";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import Signin from "./Pages/Singin";
// import Footer from "./Components/Footer";
// import "./routes.css";
import AdminDashboard from "./Pages/AdminDashboard";
import PrivateRoutes from "./Helper/AdminRouter";
import UserDashboard from "./Pages/UserDashboard";
import AdminRoutes from "./Helper/PrivateRouter";
import ProductDisplay from "./Components/Product/ProductDisplay";
import ProductAdd from "./Components/Product/ProductAdd";
import CategoryAdd from "./Components/Category/CategoryAdd";
import CategoryDisplay from "./Components/Category/CategoryDisplay";
const Routes = () => {
  return (
    <BrowserRouter>
      <Header />

      <div className="bodyWrapper">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/signin" exact component={Signin} />
          
          <PrivateRoutes
            path="/user/dashboard"
            exact
            component={UserDashboard}
          />
          <AdminRoutes
            path="/admin/dashboard"
            exact
            component={AdminDashboard}
          />
          
          <AdminRoutes path="/admin/product" exact component={ProductDisplay} />
          <AdminRoutes path="/admin/product/add" exact component={ProductAdd} />
          <AdminRoutes path="/admin/category/add" exact component={CategoryAdd} />
          <AdminRoutes path="/admin/category" exact component={CategoryDisplay} />
        </Switch>
      </div>

      {/* <Footer /> */}
    </BrowserRouter>
  );
};

export default Routes;