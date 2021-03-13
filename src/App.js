import './App.css';
import BaseLayout from './components/layout/BaseLayout';
import {
	BrowserRouter as Router,
	Switch,
	Route
  } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import Tenants from './pages/Tenants';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';
import { routes } from './const';
import DashboardTenant from './pages/DashBoardTenant';
import Login from './pages/Login';
import TenantDetail from './pages/TenantDetail';
import RequestExtension from './components/RequestExtension';

function App() {
	return (
		<Router>
			<BaseLayout>
				<Switch>
					<Route exact path={routes.DEFAULT}>
						< Dashboard/>
					</Route>
					<Route path={routes.TENANTS}>
						<Tenants />
					</Route>
					<Route path={routes.NOTIFICATIONS}>
						<Notifications />
					</Route>
					<Route path={routes.SETTINGS}>
						<Settings />
					</Route>
					<Route path="/TenantDetail" component={TenantDetail}/>
					<Route path="/DashboardTenant" component={DashboardTenant}/>
					<Route path="/Login" component={Login}/>
					<Route path="/RequestExtension" component={RequestExtension}/>
				</Switch>
			</BaseLayout>
		</Router>
	);
}

export default App;
