import './App.css';
import BaseLayout from './components/layout/BaseLayout';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect
  } from "react-router-dom";
import { useSelector } from 'react-redux';
import Dashboard from './pages/Dashboard';
import Tenants from './pages/Tenants';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';
import ChecklistTemplates from './components/checklist/ChecklistTemplates';
import ChecklistPhotos from './components/checklist/ChecklistPhotos';
import { routes } from './const';
import Report from './pages/Report';
import Login from './pages/Login';
import TenantDetail from './pages/TenantDetail';
import RequestExtension from './components/RequestExtension';
import DashboardTenant from './pages/DashBoardTenant';

function App() {
	// let isAuthenticated = useSelector(state => state.user);
	let isAuthenticated = localStorage.getItem('jwt');
	return (
		<Router>
			{ !isAuthenticated && <Redirect to={routes.LOGIN} /> }
			<Switch>
				<Route path={routes.LOGIN} component={Login} />
				<BaseLayout>
						<Route exact path={routes.DEFAULT}>
							<Dashboard />
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
						<Route path={routes.PHOTOS}>
							<ChecklistPhotos />
						</Route>
						<Route path='/report/:tenantId/:reportType' component={Report} />
						<Route exact path='/report/:tenantId' component={ChecklistTemplates} />

						<Route path="/TenantDetail" component={TenantDetail}/>
						<Route path="/DashboardTenant" component={DashboardTenant}/>
						<Route path="/Login" component={Login}/>
						<Route path="/RequestExtension" component={RequestExtension}/>
				</BaseLayout>
			</Switch>
		</Router>

	);
}

export default App;
