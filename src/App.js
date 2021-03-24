import "./App.css";
import BaseLayout from "./components/layout/BaseLayout";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Tenants from "./pages/Tenants";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";
import ChecklistTemplates from "./components/checklist/ChecklistTemplates";
import ChecklistPhotos from "./components/checklist/ChecklistPhotos";
import { routes } from "./const";
import Report from "./pages/Report";
import Login from "./pages/Login";
import CreateUser from "./pages/CreateUser";
import TenantDetail from "./pages/TenantDetail";
import Register from "./pages/Register";
import RequestExtension from "./components/RequestExtension";
import DashboardTenant from "./pages/DashBoardTenant";
import { tokenValidator } from "./utils/tokenValidator";
import AuthRoute from "./utils/AuthRoute";

function App() {
  // let isAuthenticated = useSelector(state => state.user);
  let isAuthenticated = localStorage.getItem("jwt");
  let validatorResult = tokenValidator(isAuthenticated);
  console.log("token expired: ", validatorResult.expired, "\ntype: ", validatorResult.type);
  return (
    <Router>
      {/* {(!isAuthenticated || validatorResult.expired) && (
        <Redirect to={routes.LOGIN} />
      )} */}
      <Switch>
        <Route path={routes.LOGIN} component={Login} />
        <BaseLayout>
          <AuthRoute
            exact
            path={routes.DEFAULT}
            users={["admin","auditor", "tenant"]}
            component={Dashboard}
          />
          <AuthRoute
            path={routes.TENANTS}
            users={["admin","auditor"]}
            component={Tenants}
          />
          <AuthRoute
            path={routes.NOTIFICATIONS}
            users={["admin","auditor", "tenant"]}
            component={Notifications}
          />
          <AuthRoute
            path={routes.SETTINGS}
            users={["admin","auditor", "tenant"]}
            component={Notifications}
          />
          <AuthRoute
            path={routes.PHOTOS}
            users={["admin","auditor", "tenant"]}
            component={ChecklistPhotos}
          />
					<Route path="/register/:token" component={Register}/>
          <Route path="/report/:tenantId/:reportType" component={Report} />
					<Route path="/createTenant" component={CreateUser}/>
          <Route
            exact
            path="/report/:tenantId"
            component={ChecklistTemplates}
          />
          <Route path="/TenantDetail" component={TenantDetail} />
          <Route path="/DashboardTenant" component={DashboardTenant} />
          <Route path="/Login" component={Login} />
          <Route path="/RequestExtension" component={RequestExtension} />
        </BaseLayout>
      </Switch>
    </Router>
  );
}

export default App;
