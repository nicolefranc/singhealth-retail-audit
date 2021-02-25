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
import Checklist from './components/checklist/Checklist';
import { routes } from './const';

function App() {
	return (
		<Router>
			<BaseLayout>
				<Switch>
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
					<Route path={routes.CHECKLIST}>
        				<Checklist />
      				</Route>
				</Switch>
			</BaseLayout>

			

		</Router>

	);
}

export default App;
