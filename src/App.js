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
import CreateUser from "./pages/CreateUser";
import TenantDetail from "./pages/TenantDetail";
import Register from "./pages/Register";
import RequestExtension from "./components/RequestExtension";
import DashboardTenant from "./pages/DashBoardTenant";
import { tokenValidator } from "./utils/tokenValidator";
import AuthRoute from "./utils/AuthRoute";
import Status from "./pages/Status";
import ChecklistPhotos from "./pages/ChecklistPhotos";
import ViewReport from "./components/report/ViewReport";

function App() {
    // let isAuthenticated = useSelector(state => state.user);
    let isAuthenticated = localStorage.getItem("jwt");
    let validatorResult = tokenValidator(isAuthenticated);
    console.log(
        "token expired: ",
        validatorResult.expired,
        "\ntype: ",
        validatorResult.type
    );
    return (
        <Router>
            <Switch>
                <Route path={`${routes.LOGIN}`} component={Login} />

                <Route path="/register/:token" component={Register} />
                <BaseLayout>
                    <AuthRoute
                        exact
                        path={routes.DEFAULT}
                        users={["admin", "auditor", "tenant"]}
                        component={Dashboard}
                    />
                    <AuthRoute
                        path={routes.TENANTS}
                        users={["admin", "auditor"]}
                        component={Tenants}
                    />
                    <AuthRoute
                        path={routes.NOTIFICATIONS}
                        users={["admin", "auditor", "tenant"]}
                        component={Notifications}
                    />
                    <AuthRoute
                        path={routes.SETTINGS}
                        users={["admin", "auditor", "tenant"]}
                        component={Settings}
                    />
                    <AuthRoute exact
                        path={`${routes.AUDIT}/:tenantId/:reportType/photos`}
                        users={["admin", "auditor", "tenant"]}
                        component={ChecklistPhotos}
                    />
                    <AuthRoute exact
                        path={`${routes.AUDIT}/:tenantId/:reportType`}
                        users={["admin", "auditor"]}
                        component={Report}
                    />
                    <AuthRoute exact path={`${routes.REPORT}/:reportId`}
                        component={ViewReport}
                        users={["admin", "auditor", "tenant"]}
                    />
                    <AuthRoute path="/status/:tenantId"
                        component={Status} 
                        users={["admin", "auditor", "tenant"]} 
                    />
                    <AuthRoute exact
                        path={`${routes.AUDIT}/:tenantId`}
                        users={["admin", "auditor"]}
                        component={ChecklistTemplates}
                    />
                    <AuthRoute
                        path={routes.CREATE_USER}
                        users={["admin", "auditor", "tenant"]}
                        component={CreateUser}
                    />
                    <AuthRoute
                        path="/TenantDetail/:tenantId"
                        component={TenantDetail}
                        users={["admin", "auditor"]}
                    />
                    <AuthRoute
                        path="/DashboardTenant"
                        component={DashboardTenant}
                        users={["tenant"]}
                    />
                    {/* TODO: Request extension */}
                    <Route
                        path="/RequestExtension"
                        component={RequestExtension}
                    />
                </BaseLayout>
            </Switch>
        </Router>
    );
}

export default App;
