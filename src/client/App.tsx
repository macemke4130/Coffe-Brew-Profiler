import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Import Custom Components --
import PrivateRoute from './components/PrivateRoute';

// Import Custom Pages --
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NewBrew from './pages/NewBrew';
import Chemex from './pages/brewmethods/Chemex';
import NewCoffeeBag from './pages/NewCoffeeBag';
import AllCoffeeBags from './pages/AllCoffeeBags';
import SingleCoffeeBag from './pages/SingleCoffeeBag';
import AllBrews from './pages/AllBrews';
import BrewDetails from './pages/BrewDetails';
import NewFilter from './pages/NewFilter';
import AllFilters from './pages/AllFilters';
import EditCoffeeBag from './pages/EditCoffeeBag';
import EditBrew from './pages/EditBrew';

const App = (props: AppProps) => {
return (
		<Router>
			<Switch>
				<Route exact path="/">
					<Home />
				</Route>
				<Route exact path="/login">
					<Login />
				</Route>
				<Route exact path="/register">
					<Register />
				</Route>
				<PrivateRoute path="/coffeebags/new">
					<NewCoffeeBag />
				</PrivateRoute>
				<PrivateRoute path="/filters/new">
					<NewFilter />
				</PrivateRoute>
				<PrivateRoute path="/filters/all">
					<AllFilters />
				</PrivateRoute>
				<PrivateRoute path="/brew/details/:id">
					<BrewDetails />
				</PrivateRoute>
				<PrivateRoute path="/brew/edit/:id">
					<EditBrew />
				</PrivateRoute>
				<PrivateRoute path="/coffeebags/all">
					<AllCoffeeBags />
				</PrivateRoute>
				<PrivateRoute path="/coffeebags/edit/:id">
					<EditCoffeeBag />
				</PrivateRoute>
				<PrivateRoute path="/coffeebags/:id">
					<SingleCoffeeBag />
				</PrivateRoute>
				<PrivateRoute path="/brew/chemex/:id">
					<Chemex />
				</PrivateRoute>
				<PrivateRoute exact path="/brews/new">
					<NewBrew />
				</PrivateRoute>
				<PrivateRoute exact path="/brews/all">
					<AllBrews />
				</PrivateRoute>
			</Switch>
		</Router>
	);
};

interface AppProps {}

export default App;
