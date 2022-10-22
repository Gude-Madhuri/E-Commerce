import { Route } from "react-router-dom";
import AdminHome from "./components/ecommerce/admin-components/AdminHome";
import CustomerHome from "./components/ecommerce/user-components/CustomerHome";
import SignPage from "./components/ecommerce/sign-in-up/SignPage";

import { Switch, Redirect } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import CheckOut from "./components/ecommerce/customer-orders/CheckOut";
import ViewOrder from "./components/ecommerce/customer-view-orders/ViewOrder";
import EditProfile from "./components/ecommerce/user-components/edit-profile/EditProfile";
import AddAdmin from "./components/ecommerce/admin-components/AddAdmin";
import LoginWithGoogle from "./components/ecommerce/login-with-google/LoginWithGoogle";

function App() {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  return (
    <div>
      <Switch>
        <Route exact path="/login">
          <SignPage />
        </Route>

        <Route exact path="/login-with-google">
          <LoginWithGoogle />
        </Route>

        {isAuth && (
          <Route exact path="/home">
            <CustomerHome />
          </Route>
        )}

        {isAuth && (
          <Route exact path="/admin-home">
            <AdminHome />
          </Route>
        )}

        {isAuth && (
          <Route exact path="/admin-home/add-admin">
            <AddAdmin />
          </Route>
        )}

        {isAuth && (
          <Route exact path="/home/check-out">
            <CheckOut />
          </Route>
        )}

        {isAuth && (
          <Route exact path="/home/view-orders">
            <ViewOrder />
          </Route>
        )}

        {isAuth && (
          <Route exact path="/home/edit-profile">
            <EditProfile />
          </Route>
        )}

        <Route path="/">
          <Redirect to="/login" />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
