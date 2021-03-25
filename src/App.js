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
import { routes } from "./const";
import Report from "./pages/Report";
import Login from "./pages/Login";
import TenantDetail from "./pages/TenantDetail";
import RequestExtension from "./components/RequestExtension";
import DashboardTenant from "./pages/DashBoardTenant";
import { tokenValidator } from "./utils/tokenValidator";
import AuthRoute from "./utils/AuthRoute";
import Status from "./pages/Status";
import ChecklistPhotos from "./pages/ChecklistPhotos";

function App() {
  // let isAuthenticated = useSelector(state => state.user);
  let isAuthenticated = localStorage.getItem("jwt");
  let validatorResult = tokenValidator(isAuthenticated);
  console.log("token expired: ", validatorResult.expired);
  return (
    <Router>
      {(!isAuthenticated || validatorResult.expired) && (
        <Redirect to={routes.LOGIN} />
      )}
      <Switch>
        <Route path={routes.LOGIN} component={Login} />
        <BaseLayout>
          <AuthRoute
            exact
            path={routes.DEFAULT}
            users={["auditor", "tenant", "staff", "admin"]}
            component={Dashboard}
          />
          <AuthRoute
            path={routes.TENANTS}
            users={["auditor", "staff", "admin"]}
            component={Tenants}
          />
          <AuthRoute
            path={routes.NOTIFICATIONS}
            users={["auditor", "tenant", "staff", "admin"]}
            component={Notifications}
          />
          <AuthRoute
            path={routes.SETTINGS}
            users={["auditor", "tenant", "staff", "admin"]}
            component={Notifications}
          />
          <AuthRoute
            path={routes.PHOTOS}
            users={["auditor", "tenant", "staff", "admin"]}
            component={ChecklistPhotos}
          />
          <Route path={`${routes.AUDIT}/:tenantId/:reportType`} component={Report} />
          <Route path="/status/:tenantId" component={Status} />
          <Route
            exact
            path={`${routes.AUDIT}/:tenantId`}
            component={ChecklistTemplates}
          />
          <Route path="/TenantDetail/:tenantId" component={TenantDetail} />
          <Route path="/DashboardTenant" component={DashboardTenant} />
          <Route path="/Login" component={Login} />
          <Route path="/RequestExtension" component={RequestExtension} />
        </BaseLayout>
      </Switch>
    </Router>
  );
}

export default App;
