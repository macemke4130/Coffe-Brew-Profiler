import * as React from 'react';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Import Custom Components --
import PrivateRoute from './components/PrivateRoute';

// Import Custom Pages --
import Home from './pages/Home';
import Brew from './pages/Brew';
import Login from './pages/Login';
import Register from './pages/Register';

const App = (props: AppProps) => {
	const [greeting, setGreeting] = useState<string>('');

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
				<PrivateRoute path="/brew">
					<Brew />
				</PrivateRoute>
			</Switch>
		</Router>
	);
};

interface AppProps {}

export default App;
