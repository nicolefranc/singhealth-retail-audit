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
import ChecklistNonFB from './components/checklist/ChecklistNonFB';
import ChecklistFB from './components/checklist/ChecklistFB';
import ChecklistCOVID from './components/checklist/ChecklistCOVID';
import ChecklistTemplates from './components/checklist/ChecklistTemplates';
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

					<Route path={routes.CHECKLIST_NONFB}>
        				<ChecklistNonFB />
      				</Route>
					<Route path={routes.CHECKLIST_FB}>
        				<ChecklistFB />
      				</Route>
					<Route path={routes.CHECKLIST_COVID}>
        				<ChecklistCOVID />
      				</Route>
					<Route path={routes.TEMPLATES}>
        				<ChecklistTemplates />
      				</Route>
				</Switch>
			</BaseLayout>

			

		</Router>

	);
}

export default App;
